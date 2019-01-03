import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import { AuthReducer } from '../reducers/AuthReducer'
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, AuthReducer)

let AuthStore = createStore(persistedReducer, applyMiddleware(thunk))
let AuthPersistor = persistStore(AuthStore)
export { AuthStore, AuthPersistor }
