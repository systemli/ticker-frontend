import React, { Component } from 'react'
import { Card, Dimmer, Header, Icon, Loader, Popup, Segment } from 'semantic-ui-react'
import { replaceMagic } from '../Helper'
import Moment from 'react-moment'
import Ticker from '../models/Ticker'
import PropTypes from 'prop-types'

const API_URL = process.env.REACT_APP_API_URL

export default class MessageList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      messages: [],
      isLoading: true,
      isLoadingOlderMessages: false,
      reachedMessagesEnd: false,
    }
  }

  componentDidMount () {
    document.addEventListener('scroll', this.fetchOlderMessages)

    if (this.props.ticker.active) {
      this.fetchMessages()

      this.fetchID = setInterval(
        () => this.fetchMessages(),
        this.props.refreshInterval
      )
    }
  }

  componentWillUnmount () {
    clearInterval(this.fetchID)
    document.removeEventListener('scroll', this.fetchOlderMessages)
  }

  fetchOlderMessages () {
    const root = document.getElementById('root')
    if (Math.floor(root.getBoundingClientRect().bottom) <= window.innerHeight) {
      let message = this.state.messages[this.state.messages.length - 1]
      if (message !== undefined) {
        this.setState({isLoadingOlderMessages: true})
        fetch(`${API_URL}/timeline?before=${message.id}`)
          .then(response => response.json())
          .then(response => {
            if (response.data !== undefined && response.data.messages !== null) {
              this.setState({messages: this.state.messages.concat(response.data.messages)})
            } else if (response.data !== undefined && response.data.messages == null) {
              this.setState({reachedMessagesEnd: true})
            }
            return response
          })
          .catch(function () {})
          .finally(() => {
            this.setState({isLoadingOlderMessages: false})
          })
      }
    }
  }

  fetchMessages () {
    let url = `${API_URL}/timeline`

    if (this.state.messages[0] !== undefined) {
      let after = this.state.messages[0].id
      if (after !== undefined) {
        url = `${API_URL}/timeline?after=${after}`
      }
    }

    fetch(url)
      .then(response => response.json())
      .then(response => {
        if (response.data !== undefined && response.data.messages !== null) {
          this.setState({
            messages: response.data.messages.concat(this.state.messages),
            isLoading: false,
          })
        }
      })
      .catch(function () {})

  }

  renderPlaceholder () {
    return (
      <Segment placeholder>
        <Header icon>
          <Icon name='hourglass half' color={'grey'}/>
          We dont have any messages at the moment.
        </Header>
      </Segment>
    )
  }

  render () {
    if (this.state.isLoading) {
      return (
        <Dimmer active inverted>
          <Loader inverted size='small'>Loading messages</Loader>
        </Dimmer>
      )
    }

    if (this.state.messages === undefined || this.state.messages.length === 0) {
      return this.renderPlaceholder()
    }

    const messages = this.state.messages

    return (
      <div>
        {messages.map(message =>
          <Card key={message.id} fluid>
            <Card.Content>
              <div dangerouslySetInnerHTML={{__html: replaceMagic(message.text)}}/>
            </Card.Content>
            <Card.Content extra>
              <Card.Meta>
                <Popup
                  flowing inverted
                  size='tiny'
                  trigger={<div><Icon name='clock'/><span className='date'><Moment fromNow
                                                                                   date={message.creation_date}/></span>
                  </div>}
                  content={<Moment date={message.creation_date}/>}
                />
              </Card.Meta>
            </Card.Content>
          </Card>
        )}
      </div>
    )
  }
}

MessageList.propTypes = {
  ticker: PropTypes.instanceOf(Ticker),
  refreshInterval: PropTypes.number,
}
