import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducers from "./reducers";
import setupSocket from "./sockets";
import handleNewMessage from "./sagas";
import username from "./utils/name";  


const sagaMiddleWare = createSagaMiddleware()
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleWare));
console.log("initial store data is",store.getState());

const socket = setupSocket(store.dispatch, username);
sagaMiddleWare.run(handleNewMessage, {socket, username})

store.subscribe(() => console.log(store.getState()));
ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
