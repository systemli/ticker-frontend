import React, { Component } from 'react'
import { Message } from 'semantic-ui-react'
import PropTypes from 'prop-types'

export default class UpdateMessage extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    if (true !== this.props.update) {
      return ''
    }

    return (
      <div style={{position: 'absolute', bottom: '1em', left: '1em', right: '1em', textAlign: 'center', zIndex: 1}}>
        <Message color={'yellow'} negative>
          An update is available. Click <a onClick={() => {window.location.reload()}}
                                           style={{cursor: 'pointer'}}>here</a> to update the App.
        </Message>
      </div>
    )
  }
}

UpdateMessage.propTypes = {
  update: PropTypes.bool,
}
