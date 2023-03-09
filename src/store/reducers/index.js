import { combineReducers } from 'redux';
import authReducer from './auth';
import chatReducer from './chat';
import userReducer from './user';

export default combineReducers({
  authReducer,
  chatReducer,
  userReducer,
});
