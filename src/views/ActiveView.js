import React, { Component } from 'react'
import { Container, Grid, Header, Sticky } from 'semantic-ui-react'
import UpdateMessage from '../components/UpdateMessage'
import About from '../components/About'
import ReloadInfo from '../components/ReloadInfo'
import MessageList from '../components/MessageList'
import Ticker from '../models/Ticker'
import { isMobile } from '../Helper'
import PropTypes from 'prop-types'

export default class ActiveView extends Component {
  constructor (props) {
    super(props)

    this.state = {}

    this.handleContextRef = this.handleContextRef.bind(this)
  }

  handleContextRef (stickyContext) {
    this.setState({stickyContext})
  }

  renderHeadline () {
    let headline = ''
    if (this.props.ticker === null || this.props.ticker.title === undefined) {
      headline = 'Ticker'
    } else {
      headline = this.props.ticker.title
    }

    return (
      <Header content={headline} size={'large'} style={{margin: '0 0 1rem'}}/>
    )
  }

  renderMobile () {
    return (
      <Container style={{padding: '1em 0'}}>
        <UpdateMessage update={this.props.update}/>
        <About type='modal' ticker={this.props.ticker}/>
        {this.renderHeadline()}
        <ReloadInfo/>
        <MessageList ticker={this.props.ticker} refreshInterval={this.props.refreshInterval}/>
      </Container>
    )
  }

  render () {
    if (isMobile()) {
      return this.renderMobile()
    }

    const {stickyContext} = this.state

    return (
      <Container style={{padding: '1em 0'}}>
        <UpdateMessage update={this.props.update}/>
        {this.renderHeadline()}
        <ReloadInfo/>
        <Grid divided={'vertically'}>
          <Grid.Row columns={2}>
            <Grid.Column computer={10} tablet={10}>
              <div ref={this.handleContextRef}>
                <MessageList ticker={this.props.ticker} refreshInterval={this.props.refreshInterval}/>
              </div>
            </Grid.Column>
            <Grid.Column computer={6} tablet={6}>
              <Sticky context={stickyContext} offset={30}>
                <About ticker={this.props.ticker}/>
              </Sticky>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

ActiveView.propTypes = {
  refreshInterval: PropTypes.number,
  ticker: PropTypes.instanceOf(Ticker),
  update: PropTypes.bool,
}
