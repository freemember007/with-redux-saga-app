import { applyMiddleware, createStore, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { requestsReducer } from 'redux-saga-requests'

export const fetchBooksReducer = requestsReducer({ actionType: 'FETCH_BOOKS' })


import axios from 'axios'
import { createRequestInstance, watchRequests } from 'redux-saga-requests';
import { createDriver } from 'redux-saga-requests-axios';


const rootReducer = combineReducers({
  books: fetchBooksReducer,
})

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

function configureStore (initialState = {
  books: []
}) {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware])
  )

  const axiosInstance = axios.create({
    baseURL: 'https://api2.diandianyy.com/todo/rest',
  })

  function * rootSaga () {
    yield createRequestInstance({ driver: createDriver(axiosInstance) })
    yield watchRequests()
  }
  store.sagaTask = sagaMiddleware.run(rootSaga, axiosInstance)
  // store.runSagaTask = () => {
  //   store.sagaTask = sagaMiddleware.run(rootSaga, axiosInstance);
  // };

  // store.runSagaTask()
  return store
}

export default configureStore
