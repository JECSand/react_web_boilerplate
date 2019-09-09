/*
Author: Connor Sanders
MIT License
React.js Web Client Boilerplate
9/02/2019
*/

import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { groups } from './groups.reducer';
import { todos } from './todos.reducer';
import { alert } from './alert.reducer';

// Combine all of the defined reducers into the root reducer
const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  groups,
  todos,
  alert
});

export default rootReducer;