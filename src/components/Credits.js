import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'

export default class Credits extends Component {
  render () {
    return (
      <div style={{color: 'rgba(0, 0, 0, .5)', textAlign: 'right'}}>
        <Icon name='code'/> with <Icon name='heart' color='red'/> by <a href='https://www.systemli.org'
                                                                        target='_blank'
                                                                        rel='noopener noreferrer'>systemli.org</a>
      </div>
    )
  }
}
