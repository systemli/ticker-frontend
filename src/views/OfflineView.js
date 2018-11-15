import React, { Component } from 'react'
import { Button, Container, Header, Icon, Segment } from 'semantic-ui-react'
import Credits from './Credits'

export default class OfflineView extends Component {
  render () {
    return <Container style={{paddingTop: '1em'}}>
      <Segment placeholder>
        <Header icon>
          <Icon name='ban'/>
          Seems you are offline
        </Header>
        <Button primary onClick={() => window.location.reload()}>Try reload</Button>
      </Segment>
      <Credits/>
    </Container>
  }
}
