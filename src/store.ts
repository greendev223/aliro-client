import { configureStore } from '@reduxjs/toolkit'
import { formCounterSlice } from './redux/formCounter'
import { assessmentSlice } from './redux/assessment';
import {visaPageManageSlice} from "./redux/visaPageManagement";


export const store = configureStore({
  reducer: {
    formCounter: formCounterSlice.reducer,    
    assessment: assessmentSlice.reducer,
    visaPageManage: visaPageManageSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch