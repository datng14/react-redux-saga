import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga"
import { Provider } from "react-redux"
import rootReducer from "./redux/reducers"
import rootSaga from "./redux/sagas"
import { BrowserRouter as Router } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

const sagaMiddleware = createSagaMiddleware()

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

let store = createStore(rootReducer, compose(applyMiddleware(sagaMiddleware), reduxDevTools))

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  , document.getElementById('root'));

