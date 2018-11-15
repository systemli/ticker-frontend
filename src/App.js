import React, { Component } from 'react'
import {
  Container,
  Dimmer,
  Loader,
} from 'semantic-ui-react'
import OfflineView from './views/OfflineView'
import InactiveView from './views/InactiveView'
import Ticker from './models/Ticker'
import ActiveView from './views/ActiveView'

const API_URL = process.env.REACT_APP_API_URL

const runtime = require('offline-plugin/runtime')

export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      ticker: null,
      settings: {
        refresh_interval: 10000,
        inactive_settings: {},
      },
      isLoading: true,
      isUpdateAvailable: false,
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
  }

  componentDidMount () {
    fetch(`${API_URL}/init`)
      .then(response => response.json())
      .then(response => {
        if (response.data !== undefined && response.data.settings !== undefined) {
          this.setState({settings: response.data.settings})
        }
        if (response.data !== undefined && response.data.ticker !== null && response.data.ticker.active) {
          this.setState({ticker: new Ticker(response.data.ticker)})

          document.title = this.state.ticker.title
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

  render () {
    if (this.state.isLoading) {
      return (
        <Container>
          <Dimmer active>
            <Loader content='Loading' size='large'/>
          </Dimmer>
        </Container>
      )
    }

    if (this.state.ticker !== null && this.state.ticker.active) {
      return (<ActiveView ticker={this.state.ticker} update={this.state.isUpdateAvailable}
                          refreshInterval={this.state.settings.refresh_interval}/>)
    }

    if (this.state.ticker === null && this.state.settings.inactive_settings !== undefined) {
      return (<InactiveView settings={this.state.settings.inactive_settings} update={this.state.isUpdateAvailable}/>)
    }

    if (this.state.offline) {
      return (<OfflineView/>)
    }

    return (
      <Container>
        ...
      </Container>
    )
  }
}
