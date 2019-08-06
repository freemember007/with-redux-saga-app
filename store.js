import { applyMiddleware, createStore, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer, { exampleInitialState } from './reducer'
import rootSaga from './saga'
import {fetchBooksReducer} from './actions';
import axios from 'axios'
const rootReducer = combineReducers({
  reducer: reducer,
  fetchBooksReducer,
})

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

function configureStore (initialState = {
  count: 0,
  error: false,
  lastUpdate: 0,
  light: false,
  placeholderData: null,
  books: []
}) {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    reducer,
    initialState,
    bindMiddleware([sagaMiddleware])
  )

  const axiosInstance = axios.create({
    baseURL: 'https://api2.diandianyy.com/todo/rest',
  })
  store.sagaTask = sagaMiddleware.run(rootSaga, axiosInstance)
  // store.runSagaTask = () => {
  //   store.sagaTask = sagaMiddleware.run(rootSaga, axiosInstance);
  // };

  // store.runSagaTask()
  return store
}

export default configureStore
