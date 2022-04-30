import { configureStore } from '@reduxjs/toolkit'
import { AuthReducer } from '../reducers/authReducer';

export const store = configureStore({
  reducer: {
    auth: AuthReducer
  },
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch