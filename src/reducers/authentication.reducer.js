/*
Authors: Connor Sanders and Taylor Smith
MIT License
React.js Web Client Boilerplate
9/02/2019
*/

import {
  USERS_LOGIN_REQUEST,
  USERS_LOGIN_SUCCESS,
  USERS_LOGIN_FAILURE,
  USERS_LOGOUT,
  USERS_GET_APIKEY_SUCCESS,
  USERS_GET_APIKEY_FAILURE
} from '../../src/actions/actionTypes';

// Get user data from browser's localstorage and initialize login state depending on if the user data is there.
let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

// Export auth reducers
export function authentication(state = initialState, action) {
  switch (action.type) {
    case USERS_LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case USERS_LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case USERS_LOGIN_FAILURE:
      return {};
    case USERS_LOGOUT:
      return {};
    case USERS_GET_APIKEY_SUCCESS:
      return {
        loggedIn: true,
        user: user,
        apiKey: action.apiKey
      };
    case USERS_GET_APIKEY_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}