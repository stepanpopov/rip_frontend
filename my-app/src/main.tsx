import React from 'react'
import ReactDOM from 'react-dom/client'

import { store } from './store'
import { Provider } from "react-redux";
import { App } from "./App"
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={`/`}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
