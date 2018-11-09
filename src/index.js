import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import 'semantic-ui-css/semantic.min.css'

const runtime = require('offline-plugin/runtime')

runtime.install({
  onUpdating: () => {},
  onUpdateReady: () => {
    // Tells to new SW to take control immediately
    runtime.applyUpdate()
  },
  onUpdated: () => {
    // Reload the webpage to load into the new version
    window.location.reload()
  },
  onUpdateFailed: () => {}
})

ReactDOM.render(<App/>, document.getElementById('root'))
