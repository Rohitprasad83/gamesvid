import React from 'react'
import './index.css'
import App from './App'
import { makeServer } from './server'
import { BrowserRouter } from 'react-router-dom'
import * as ReactDOMClient from 'react-dom/client'
import { store } from 'app/store'
import { Provider } from 'react-redux'
// Call make Server
makeServer()

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
