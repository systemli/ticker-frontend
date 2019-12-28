import React, { Component } from 'react'
import { Card, Icon, Popup, Grid } from 'semantic-ui-react'
import { replaceMagic } from '../Helper'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import Map from './Map'

export default class Message extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {attributes} = this.props
    const trigger = <div>
      <Icon name='clock'/>
      <span className='date'><Moment fromNow date={attributes.creation_date}/></span>
    </div>
    const content = <Moment date={attributes.creation_date}/>

    return (
      <Card fluid>
        <Card.Content>
          <div dangerouslySetInnerHTML={{__html: replaceMagic(attributes.text)}}/>
        </Card.Content>
        <Map featureCollection={attributes.geo_information}/>
        <Card.Content extra>
          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>
                <Popup
                  flowing inverted
                  size='tiny'
                  trigger={trigger}
                  content={content}
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
