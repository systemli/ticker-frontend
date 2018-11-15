import React, { Component } from 'react'
import { Card, Container, Grid, Header, Icon, List } from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'
import PropTypes from 'prop-types'
import InactiveSettings from '../models/InactiveSettings'
import Credits from '../components/Credits'
import UpdateMessage from '../components/UpdateMessage'

export default class InactiveView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      settings: new InactiveSettings(props.settings),
    }
  }

  renderHeader () {
    if (this.state.settings.headline === undefined || this.state.settings.subHeadline === undefined) {
      return
    }

    return (
      <Header size='huge' icon textAlign='center'>
        <Icon name='hide'/>
        <Header.Content>
          {this.state.settings.headline}
          <Header.Subheader>
            {this.state.settings.subHeadline}
          </Header.Subheader>
        </Header.Content>
      </Header>
    )
  }

  renderDescription () {
    if (this.state.settings.description === undefined) {
      return
    }

    return (
      <ReactMarkdown source={this.state.settings.description}/>
    )
  }

  renderAuthor () {
    if (this.state.settings.author === undefined) {
      return
    }

    return (
      <List.Item>
        <List.Icon name='users'/>
        <List.Content>{this.state.settings.author}</List.Content>
      </List.Item>
    )
  }

  renderEmail () {
    if (this.state.settings.email === undefined) {
      return
    }

    return (
      <List.Item>
        <List.Icon name='mail'/>
        <List.Content><a
          href={'mailto:' + this.state.settings.email}>Email</a></List.Content>
      </List.Item>
    )
  }

  renderHomepage () {
    if (this.state.settings.homepage === undefined) {
      return
    }

    return (
      <List.Item>
        <List.Icon name='linkify'/>
        <List.Content><a href={this.state.settings.homepage}>Homepage</a></List.Content>
      </List.Item>
    )
  }

  renderTwitter () {
    if (this.state.settings.twitter === undefined) {
      return
    }

    return (
      <List.Item>
        <List.Icon name='twitter'/>
        <List.Content>
          <a href={'https://twitter.com/' + this.state.settings.twitter}>@{this.state.settings.twitter}</a>
        </List.Content>
      </List.Item>
    )
  }

  render () {
    return (
      <Container style={{paddingTop: 50}}>
        <UpdateMessage update={this.props.update}/>
        <Grid centered>
          <Grid.Column width={8}>
            {this.renderHeader()}
            <Card fluid>
              <Card.Content>
                {this.renderDescription()}
              </Card.Content>
              <Card.Content>
                <Header size='small'>Information</Header>
                <List>
                  {this.renderAuthor()}
                  {this.renderEmail()}
                  {this.renderHomepage()}
                  {this.renderTwitter()}
                </List>
              </Card.Content>
            </Card>
            <Credits/>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

InactiveView.propTypes = {
  settings: PropTypes.object,
  update: PropTypes.bool,
}
