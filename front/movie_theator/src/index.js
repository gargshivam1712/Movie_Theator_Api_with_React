import React from 'react';
import ReactDOM from 'react-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import App from './App';
import {BrowserRouter} from 'react-router-dom'

import {store} from './store.js'
import {Provider} from 'react-redux'


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    
    <Provider store={store}>
      <App/>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

