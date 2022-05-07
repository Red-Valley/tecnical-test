import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'

import { rootReducer } from './rootReducer'

// this configuration has a white list and a black list to discriminate the persistence of the data
const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['recoverPassword'],
}

// connect configuration with reducers modules
const persistedReducer = persistReducer(persistConfig, rootReducer)

// integrate data persistence from global state application
const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))

// connect store with redux persistent
const persistor = persistStore(store)

// Export store and persistor to be used in the index
export { store, persistor }
