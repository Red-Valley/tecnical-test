import { combineReducers } from 'redux'

// Reducers
import { reducer as authReducer } from './auth/reducer'
import { reducer as socketReducer } from './socket/reducer'

// Root reducer
export const rootReducer = combineReducers({
  auth: authReducer,
  socket: socketReducer,
})

// Global state from application
export type RootState = ReturnType<typeof rootReducer>
