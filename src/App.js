import React, { Component } from 'react'
import Moment from 'react-moment'
import {
  Card,
  Container,
  Dimmer,
  Grid,
  Header,
  Icon,
  Loader,
  Popup,
  Segment,
  Sticky
} from 'semantic-ui-react'
import OfflineView from './views/OfflineView'
import InactiveView from './views/InactiveView'
import UpdateMessage from './components/UpdateMessage'
import Ticker from './models/Ticker'
import About from './components/About'
import ReloadInfo from './components/ReloadInfo'

const API_URL = process.env.REACT_APP_API_URL

const runtime = require('offline-plugin/runtime')

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      ticker: null,
      settings: {
        refresh_interval: 10000,
        inactive_settings: {},
      },
      messages: [],
      isLoading: true,
      isLoadingOlderMessages: false,
      isInitialized: false,
      isUpdateAvailable: false,
      reachedMessagesEnd: false,
      offline: false,
    }

    runtime.install({
      onUpdating: () => {},
      onUpdateReady: () => {
        runtime.applyUpdate()
      },
      onUpdated: () => {
        this.setState({isUpdateAvailable: true})
      },
      onUpdateFailed: () => {}
    })

    this.fetchMessages = this.fetchMessages.bind(this)
    this.fetchOlderMessages = this.fetchOlderMessages.bind(this)
    this.handleContextRef = this.handleContextRef.bind(this)
  }

  componentDidMount () {
    document.addEventListener('scroll', this.fetchOlderMessages)

    fetch(`${API_URL}/init`)
      .then(response => response.json())
      .then(response => {
        if (response.data !== undefined && response.data.settings !== undefined) {
          this.setState({settings: response.data.settings})
        }
        if (response.data !== undefined && response.data.ticker !== null && response.data.ticker.active) {
          this.setState({ticker: new Ticker(response.data.ticker)})

          document.title = this.state.ticker.title

          if (this.state.ticker.active) {
            this.fetchMessages()

            this.fetchID = setInterval(
              () => this.fetchMessages(),
              this.state.settings.refresh_interval
            )
          }
        }

        this.setState({isLoading: false, offline: false})

        if (response.data.ticker === null) {
          this.setState({isInitialized: true})
        }
      })
      .catch(function () {
        this.setState({offline: true})
      }.bind(this))
  }

  componentWillUnmount () {
    clearInterval(this.fetchID)
    document.removeEventListener('scroll', this.fetchOlderMessages)
  }

  static isMobile () {
    let w = window,
      d = document,
      documentElement = d.documentElement,
      body = d.getElementsByTagName('body')[0],
      width = w.innerWidth || documentElement.clientWidth || body.clientWidth

    // the mobile breakpoint
    return width < 768
  }

  static replaceMagic (text) {
    return (text
      .replace(/(https?:\/\/([^\s]+))/g, '<a href="$1" target="_blank">$2</a>')
      .replace(/#(\S+)/g, '<a target="_blank" href="https://twitter.com/search?q=%23$1">#$1</a>')
      .replace(/@(\S+)/g, '<a target="_blank" href="https://twitter.com/$1">@$1</a>')
      .replace(/(?:\r\n|\r|\n)/g, '<br/>'))
  }

  handleContextRef (stickyContext) {
    this.setState({stickyContext})
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
              this.setState({
                messages: this.state.messages.concat(response.data.messages)
              })
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
          this.setState({messages: response.data.messages.concat(this.state.messages)})
        }

        this.setState({isInitialized: true})
      })
      .catch(function () {})

  }

  renderMessages () {
    if (this.state.messages === undefined || this.state.messages.length === 0) {
      return (
        <Segment placeholder>
          <Header icon>
            <Icon name='hourglass half' color={'grey'}/>
            We dont have any messages at the moment.
          </Header>
        </Segment>
      )
    }

    const messages = this.state.messages

    return (
      <div>
        {messages.map(message =>
          <Card key={message.id} fluid>
            <Card.Content>
              <div dangerouslySetInnerHTML={{__html: App.replaceMagic(message.text)}}/>
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

  renderHeadline () {
    let headline = ''
    if (this.state.ticker === null || this.state.ticker.title === undefined) {
      headline = 'Ticker'
    } else {
      headline = this.state.ticker.title
    }

    return (
      <Header content={headline} size={'large'} style={{margin: '0 0 1rem'}}/>
    )
  }

  renderMobile () {
    return (
      <Container style={{padding: '1em 0'}}>
        <UpdateMessage update={this.state.isUpdateAvailable}/>
        <About type='modal' ticker={this.state.ticker}/>
        {this.renderHeadline()}
        <ReloadInfo/>
        {this.renderMessages()}
      </Container>
    )
  }

  renderActiveMode () {
    if (App.isMobile()) {
      return this.renderMobile()
    }

    const {stickyContext} = this.state

    return (
      <Container style={{padding: '1em 0'}}>
        <UpdateMessage update={this.state.isUpdateAvailable}/>
        {this.renderHeadline()}
        <ReloadInfo/>
        <Grid divided={'vertically'}>
          <Grid.Row columns={2}>
            <Grid.Column computer={10} tablet={10}>
              <div ref={this.handleContextRef}>
                {this.renderMessages()}
              </div>
            </Grid.Column>
            <Grid.Column computer={6} tablet={6}>
              <Sticky context={stickyContext} offset={30}>
                <About ticker={this.state.ticker}/>
              </Sticky>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }

  render () {
    if (this.state.ticker !== null && this.state.ticker.active && this.state.isInitialized) {
      return this.renderActiveMode()
    }

    if (this.state.ticker === null && this.state.settings.inactive_settings !== undefined && this.state.isInitialized) {
      return (<InactiveView settings={this.state.settings.inactive_settings} update={this.state.isUpdateAvailable}/>)
    }

    if (this.state.offline) {
      return (<OfflineView/>)
    }

    return (
      <Container>
        <Dimmer active>
          <Loader content='Loading' size='large'/>
        </Dimmer>
      </Container>
    )
  }
}

export default App
