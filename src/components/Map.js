import React from 'react'
import { Map as LeafletMap, GeoJSON, TileLayer } from 'react-leaflet'
import { Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

export default class Map extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      expandMap: false,
      featureCollection: JSON.parse(this.props.featureCollection),
    }
  }

  _hasFeatureCollection () {
    return this.state.featureCollection.features.length > 0
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
    if (!this._hasFeatureCollection()) return null
    return (
      <div className='message-map'>
        <LeafletMap center={[0, 0]} zoom={1} className={this.state.expandMap ? 'leaflet-container--extended' : ''}
                    ref={(ref) => { this.map = ref }}>
          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
          <GeoJSON data={this.state.featureCollection} onAdd={this.onGeoInformationAdded}/>
        </LeafletMap>
        <Button icon={this.state.expandMap ? 'compress' : 'expand'} onClick={this.toggleExpand.bind(this)}
                className='message-map-expand'/>
      </div>
    )
  }
}

Map.propTypes = {
  featureCollection: PropTypes.string.isRequired,
}
