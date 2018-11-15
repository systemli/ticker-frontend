import React, { Component } from 'react'
import { Message } from 'semantic-ui-react'

export default class ReloadInfo extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showReloadInfo: null === localStorage.getItem('showReloadInfo'),
    }

    this.handleOnDismiss = this.handleOnDismiss.bind(this)
  }

  handleOnDismiss () {
    this.setState({showReloadInfo: false})

    localStorage.setItem('showReloadInfo', '0')
  }

  render () {
    return (
      <Message
        color='teal' icon='info'
        hidden={!this.state.showReloadInfo}
        onDismiss={this.handleOnDismiss}
        header='Information'
        content='The messages update automatically. There is no need to reload the entire page.'
      />
    )
  }
}
