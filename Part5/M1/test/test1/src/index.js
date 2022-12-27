import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { StyleRoot } from 'radium'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <StyleRoot><App /></StyleRoot>
  </React.StrictMode>
)
