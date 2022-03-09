import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga';
import './assets/css/main.css';
import App from './App';
import reducers from './reducers/index.js';
import setupSockets from './sockets';
import handleNewMessage from './sagas';
import Cookies from 'universal-cookie';
import nickRandom from './utils/name';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

const cookies = new Cookies();
const username = cookies.get('nickname') ? cookies.get('nickname') : nickRandom;

const socket = setupSockets(store.dispatch, username);
sagaMiddleware.run(handleNewMessage, { socket, username })
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);