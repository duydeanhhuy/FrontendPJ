import { createStore } from 'redux'

import rootReducer from './reducers/rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware, { thunk } from 'redux-thunk'
import { applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
storage}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
)
let persistor = persistStore(store)
export { store ,persistor}
