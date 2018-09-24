import React, { Component } from 'react'
import Moment from 'react-moment'
import ReactMarkdown from 'react-markdown'
import {
  Card,
  Container,
  Dimmer,
  Grid,
  Header,
  Icon,
  List,
  Loader,
  Message,
  Popup,
  Sticky,
  Button
} from 'semantic-ui-react'

const API_URL = process.env.REACT_APP_API_URL

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      ticker: null,
      settings: {
        refresh_interval: 10000,
        inactive_settings: {
          author: '',
          description: '',
          email: '',
          headline: '',
          homepage: '',
          sub_headline: '',
          twitter: '',
        },
      },
      messages: [],
      isLoading: true,
      isLoadingOlderMessages: false,
      reachedMessagesEnd: false,
      showReloadInfo: localStorage.getItem('showReloadInfo') !== '0' || true,
    }

    this.handleReloadInfoDismiss = this.handleReloadInfoDismiss.bind(this)
    this.fetchMessages = this.fetchMessages.bind(this)
    this.fetchOlderMessages = this.fetchOlderMessages.bind(this)
  }

  componentDidMount () {
    this.initializeScrollListener()
    window.addEventListener('resize', () => {
       this.initializeScrollListener()
    })

    fetch(`${API_URL}/init`)
      .then(response => response.json())
      .then(response => {
        if (response.data !== undefined && response.data.settings !== undefined) {
          this.setState({settings: response.data.settings})
        }
        if (response.data !== undefined && response.data.ticker !== null && response.data.ticker.active) {
          this.setState({ticker: response.data.ticker})

          document.title = this.state.ticker.title

          if (this.state.ticker.active) {
            this.fetchMessages()

            this.fetchID = setInterval(
              () => this.fetchMessages(),
              this.state.settings.refresh_interval
            )
          }
        }

        this.setState({isLoading: false})
      })
  }

  componentWillUnmount () {
    clearInterval(this.fetchID)
    window.removeEventListener('scroll', this.fetchOlderMessages())
  }

  initializeScrollListener() {
    let w = window,
      d = document,
      documentElement = d.documentElement,
      body = d.getElementsByTagName('body')[0],
      width = w.innerWidth || documentElement.clientWidth || body.clientWidth

    // the mobile breakpoint
    if (768 <= width) {
      document.addEventListener('scroll', this.fetchOlderMessages)
    } else {
      document.removeEventListener('scroll', this.fetchOlderMessages)
    }
  }

  static replaceMagic (text) {
    return (text
      .replace(/(https?:\/\/([^\s]+))/g, '<a href="$1" target="_blank">$2</a>')
      .replace(/#(\S+)/g, '<a target="_blank" href="https://twitter.com/search?q=%23$1">#$1</a>')
      .replace(/@(\S+)/g, '<a target="_blank" href="https://twitter.com/$1">@$1</a>')
      .replace(/(?:\r\n|\r|\n)/g, '<br/>'))
  }

  fetchOlderMessages () {
    const root = document.getElementById('root')
      console.log('yolo');
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
          }).finally(() => {
            this.setState({isLoadingOlderMessages: false})
          })
      }
    }
  }

  fetchMessages () {
    if (this.state.messages[0] !== undefined) {
      let after = this.state.messages[0].id

      if (after !== undefined) {
        fetch(`${API_URL}/timeline?after=${after}`)
          .then(response => response.json())
          .then(response => {
            if (response.data !== undefined && response.data.messages !== null) {
              this.setState({messages: response.data.messages.concat(this.state.messages)})
            }
          })
      }
    } else {
      fetch(`${API_URL}/timeline`)
        .then(response => response.json())
        .then(response => {
          if (response.data !== undefined && response.data.messages !== null) {
            this.setState({messages: response.data.messages})
          }
        })
    }
  }

  handleReloadInfoDismiss () {
    this.setState({showReloadInfo: false})

    localStorage.setItem('showReloadInfo', '0')
  }

  renderReloadInfoMessage () {
    if (localStorage.getItem('showReloadInfo') === '0') {
      return
    }

    return (
      <Message
        color='teal' icon='info'
        hidden={!this.state.showReloadInfo}
        onDismiss={this.handleReloadInfoDismiss}
        header='Information'
        content='The messages update automatically. There is no need to reload the entire page.'
      />
    )
  }

  renderMessages () {
    if (this.state.messages === undefined || this.state.messages.length === 0) {
      return
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
      <Header content={headline} size={'large'}/>
    )
  }

  renderTicker () {
    if (this.state.ticker === null || this.state.ticker.id === undefined) {
      return
    }

    return (
      <Card fluid>
        <Card.Content><Card.Header>Informationen</Card.Header></Card.Content>
        <Card.Content content={<ReactMarkdown source={this.state.ticker.description}/>}/>
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
    )
  }

  renderAuthorItem () {
    if (!this.state.ticker.information.author) {
      return
    }

    return (
      <List.Item>
        <List.Icon name='users'/>
        <List.Content>{this.state.ticker.information.author}</List.Content>
      </List.Item>
    )
  }

  renderEmailItem () {
    if (!this.state.ticker.information.email) {
      return
    }

    return (
      <List.Item>
        <List.Icon name='mail'/>
        <List.Content><a
          target='_blank'
          rel='noopener noreferrer'
          href={`mailto:${this.state.ticker.information.email}`}>{this.state.ticker.information.email}</a></List.Content>
      </List.Item>
    )
  }

  renderHomepageItem () {
    if (!this.state.ticker.information.url) {
      return
    }

    return (
      <List.Item>
        <List.Icon name='linkify'/>
        <List.Content><a
          target='_blank'
          rel='noopener noreferrer'
          href={`${this.state.ticker.information.url}`}>{this.state.ticker.information.url.replace(/http[s]:\/\/?/, '')}</a></List.Content>
      </List.Item>
    )
  }

  renderTwitterItem () {
    if (!this.state.ticker.information.twitter) {
      return
    }

    return (
      <List.Item>
        <List.Icon name='twitter'/>
        <List.Content><a
          target='_blank'
          rel='noopener noreferrer'
          href={`https://twitter.com/${this.state.ticker.information.twitter}`}>@{this.state.ticker.information.twitter}</a></List.Content>
      </List.Item>
    )
  }

  renderFacebookItem () {
    if (!this.state.ticker.information.facebook) {
      return
    }

    return (
      <List.Item>
        <List.Icon name='facebook'/>
        <List.Content><a
          target='_blank'
          rel='noopener noreferrer'
          href={`https://fb.com/${this.state.ticker.information.facebook}`}>fb.com/{this.state.ticker.information.facebook}</a></List.Content>
      </List.Item>
    )
  }

  renderCredits () {
    return (
      <div style={{color: 'rgba(0, 0, 0, .5)', textAlign: 'right'}}>
        <Icon name='code'/> with <Icon name='heart' color='red'/> by <a href='https://www.systemli.org'
                                                                        target='_blank'
                                                                        rel='noopener noreferrer'>systemli.org</a>
      </div>
    )
  }

  renderActiveMode () {
    return (
      <Container style={{paddingTop: 50}}>
        <Dimmer active={this.state.isLoading} page>
          <Loader size='huge' content='Initializing...'/>
        </Dimmer>
        {this.renderHeadline()}
        {this.renderReloadInfoMessage()}
        <Grid>
          <Grid.Row columns={2} only='mobile'>
            <Grid.Column mobile={16}>
              {this.renderMessages()}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2} only='mobile'>
            <Grid.Column mobile={16}>
              {this.renderLoadMoreButton()}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row only="computer tablet">
            <Grid.Column computer={10} mobile={16} tablet={10}>
              {this.renderMessages()}
            </Grid.Column>
            <Grid.Column computer={6} mobile={16} tablet={6}>
              <Sticky offset={30}>
                {this.renderTicker()}
                {this.renderCredits()}
              </Sticky>
            </Grid.Column>
           </Grid.Row>
        </Grid>
      </Container>
    )
  }

  renderLoadMoreButton() {
      if (this.state.isLoadingOlderMessages && !this.state.reachedMessagesEnd) {
        return (<Button loading floated='right'>Loading</Button>)
      } else if (!this.state.isLoadingOlderMessages && !this.state.reachedMessagesEnd) {
        return (<Button onClick={() => this.fetchOlderMessages()} floated='right'>Older</Button>)
      }
  }

  renderInactiveMode () {
    const authorItem = (this.state.settings.inactive_settings.author) ? <List.Item>
      <List.Icon name='users'/>
      <List.Content>{this.state.settings.inactive_settings.author}</List.Content>
    </List.Item> : ''

    const emailItem = (this.state.settings.inactive_settings.email) ? <List.Item>
      <List.Icon name='mail'/>
      <List.Content><a
        href={'mailto:' + this.state.settings.inactive_settings.email}>Email</a></List.Content>
    </List.Item> : ''

    const homepageItem = (this.state.settings.inactive_settings.homepage) ? <List.Item>
      <List.Icon name='linkify'/>
      <List.Content><a href={this.state.settings.inactive_settings.homepage}>Homepage</a></List.Content>
    </List.Item> : ''

    const twitterItem = (this.state.settings.inactive_settings.twitter) ? <List.Item>
      <List.Icon name='twitter'/>
      <List.Content><a
        href={'https://twitter.com/' + this.state.settings.inactive_settings.twitter}>@{this.state.settings.inactive_settings.twitter}</a></List.Content>
    </List.Item> : ''

    return (
      <Container style={{paddingTop: 50}}>
        <Grid centered>
          <Grid.Column width={8}>
            <Header size='huge' icon textAlign='center'>
              <Icon name='hide'/>
              <Header.Content>
                {this.state.settings.inactive_settings.headline}
                <Header.Subheader>
                  {this.state.settings.inactive_settings.sub_headline}
                </Header.Subheader>
              </Header.Content>
            </Header>
            <Card fluid>
              <Card.Content>
                <ReactMarkdown source={this.state.settings.inactive_settings.description}/>
              </Card.Content>
              <Card.Content>
                <Header size='small'>Information</Header>
                <List>
                  {authorItem}
                  {emailItem}
                  {homepageItem}
                  {twitterItem}
                </List>
              </Card.Content>
            </Card>
            {this.renderCredits()}
          </Grid.Column>
        </Grid>
      </Container>
    )
  }

  render () {
    if (this.state.ticker !== null && this.state.ticker.active) {
      return this.renderActiveMode()
    }

    if (this.state.settings.inactive_settings !== undefined) {
      return this.renderInactiveMode()
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
