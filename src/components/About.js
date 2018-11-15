import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Icon, List, Modal } from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'
import Credits from './Credits'
import Ticker from '../models/Ticker'

export default class About extends Component {
  constructor (props) {
    super(props)

  }

  renderAuthorItem () {
    if (!this.props.ticker.information.author) {
      return
    }

    return (
      <List.Item>
        <List.Icon name='users'/>
        <List.Content>{this.props.ticker.information.author}</List.Content>
      </List.Item>
    )
  }

  renderEmailItem () {
    if (!this.props.ticker.information.email) {
      return
    }

    return (
      <List.Item>
        <List.Icon name='mail'/>
        <List.Content><a
          target='_blank'
          rel='noopener noreferrer'
          href={`mailto:${this.props.ticker.information.email}`}>{this.props.ticker.information.email}</a></List.Content>
      </List.Item>
    )
  }

  renderHomepageItem () {
    if (!this.props.ticker.information.url) {
      return
    }

    return (
      <List.Item>
        <List.Icon name='linkify'/>
        <List.Content><a
          target='_blank'
          rel='noopener noreferrer'
          href={`${this.props.ticker.information.url}`}>{this.props.ticker.information.url.replace(/http[s]:\/\/?/, '')}</a></List.Content>
      </List.Item>
    )
  }

  renderTwitterItem () {
    if (!this.props.ticker.information.twitter) {
      return
    }

    return (
      <List.Item>
        <List.Icon name='twitter'/>
        <List.Content><a
          target='_blank'
          rel='noopener noreferrer'
          href={`https://twitter.com/${this.props.ticker.information.twitter}`}>@{this.props.ticker.information.twitter}</a></List.Content>
      </List.Item>
    )
  }

  renderFacebookItem () {
    if (!this.props.ticker.information.facebook) {
      return
    }

    return (
      <List.Item>
        <List.Icon name='facebook'/>
        <List.Content><a
          target='_blank'
          rel='noopener noreferrer'
          href={`https://fb.com/${this.props.ticker.information.facebook}`}>fb.com/{this.props.ticker.information.facebook}</a></List.Content>
      </List.Item>
    )
  }

  renderCard () {
    return (
      <div>
        <Card fluid>
          <Card.Content><Card.Header>About</Card.Header></Card.Content>
          <Card.Content content={<ReactMarkdown source={this.props.ticker.description}/>}/>
          <Card.Content>
            <List>
              {this.renderAuthorItem()}
              {this.renderEmailItem()}
              {this.renderHomepageItem()}
              {this.renderTwitterItem()}
              {this.renderFacebookItem()}
            </List>
          </Card.Content>
        </Card>
        <Credits/>
      </div>
    )
  }

  renderModal () {
    return (
      <Modal closeIcon
             dimmer={'blurring'}
             trigger={<Button circular floated={'right'} icon color={'blue'}><Icon name={'info'}/></Button>}>
        <Modal.Header>About</Modal.Header>
        <Modal.Content>
          <ReactMarkdown source={this.props.ticker.description}/>
        </Modal.Content>
        <Modal.Content>
          <List>
            {this.renderAuthorItem()}
            {this.renderEmailItem()}
            {this.renderHomepageItem()}
            {this.renderTwitterItem()}
            {this.renderFacebookItem()}
          </List>
        </Modal.Content>
        <Modal.Content>
          <Credits/>
        </Modal.Content>
      </Modal>
    )
  }

  render () {
    if (this.props.ticker === null || this.props.ticker.id === undefined) {
      return
    }

    if (this.props.type === 'modal') {
      return this.renderModal()
    }

    return this.renderCard()
  }
}

About.propTypes = {
  ticker: PropTypes.instanceOf(Ticker),
  type: PropTypes.string,
}
