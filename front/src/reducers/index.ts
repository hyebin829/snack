import { combineReducers } from 'redux'
import postSlice from './post'
import userSlice from './user'

const rootReducer = combineReducers({
  user: userSlice.reducer,
  post: postSlice.reducer,
})

export default rootReducer
