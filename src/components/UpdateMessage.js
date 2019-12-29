import React, { Component } from 'react'
import { Message } from 'semantic-ui-react'
import PropTypes from 'prop-types'

export default class UpdateMessage extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    if (true !== this.props.update) {
      return null
    }

    const link = <a onClick={() => {window.location.reload()}} style={{cursor: 'pointer'}}>here</a>

    return (
      <div style={{position: 'fixed', bottom: '1em', left: '1em', right: '1em', textAlign: 'center', zIndex: 1}}>
        <Message color={'yellow'} negative>
          An update is available. Click {link} to update the App.
        </Message>
      </div>
    )
  }
}

UpdateMessage.propTypes = {
  update: PropTypes.bool,
}
