import { combineReducers } from 'redux';
import profileReducer from './profileReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  profileData: profileReducer,
  userData: userReducer,
  // Add other reducers here if needed
});

export default rootReducer;
