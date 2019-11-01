import React, { Component } from 'react'
import { Map, TileLayer, GeoJSON } from 'react-leaflet'
import { Button, Card, Icon, Popup, Grid } from 'semantic-ui-react'
import { replaceMagic } from '../Helper'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

export default class Message extends Component {
  constructor (props) {
    super(props)

    this.state = {
      expandMap: false,
      featureCollection: this.props.attributes.geo_information !== undefined ? JSON.parse(this.props.attributes.geo_information) : null,
    }

    this.toggleExpand = this.toggleExpand.bind(this);
  }

  _hasFeatureCollection () {
    return (this.state.featureCollection !== null && this.state.featureCollection.features.length > 0)
  }

  _renderMap () {
    if (!this._hasFeatureCollection()) return null
    return (
      <div className='message-map'>
        <Map center={[0, 0]} zoom={1} className = {this.state.expandMap ? 'leaflet-container--extended' : ''} ref={(ref) => { this.map = ref; }}>
          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
          <GeoJSON data={this.state.featureCollection} onAdd={this.onGeoInformationAdded}/>
        </Map>
        <Button icon={this.state.expandMap ? 'compress' : 'expand'} onClick={this.toggleExpand} className='message-map-expand' />
      </div>
    )
  }

  toggleExpand () {
    this.setState({expandMap: !this.state.expandMap})
    window.dispatchEvent(new Event('resize'))
    // TODO: fitBounds
  }

  onGeoInformationAdded (event) {
    const leafletLayer = event.target
    const features = Object.values(leafletLayer._layers)

    if (features.length === 1 && features[0].feature.geometry.type === 'Point') {
      const coords = features[0].feature.geometry.coordinates
      leafletLayer._map.setView([coords[1], coords[0]], 13)
    } else {
      leafletLayer._map.fitBounds(leafletLayer.getBounds())
    }

  }

  render () {
    const {attributes} = this.props

    return (
      <Card fluid>
        <Card.Content>
          <div dangerouslySetInnerHTML={{__html: replaceMagic(attributes.text)}}/>
        </Card.Content>
        {this._renderMap()}
        <Card.Content extra>

          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>
                <Popup
                  flowing inverted
                  size='tiny'
                  trigger={<div><Icon name='clock'/><span className='date'><Moment fromNow
                                                                                   date={attributes.creation_date}/></span>
                  </div>}
                  content={<Moment date={attributes.creation_date}/>}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>

        </Card.Content>
      </Card>
    )
  }
}

Message.propTypes = {
  attributes: PropTypes.object.isRequired
}
