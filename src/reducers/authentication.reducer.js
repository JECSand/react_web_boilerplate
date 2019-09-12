/*
Author: Connor Sanders
MIT License
React.js Web Client Boilerplate
9/02/2019
*/

import { userConstants } from '../constants';

// Get user data from browser's localstorage and initialize login state depending on if the user data is there.
let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

// Export auth reducers
export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    case userConstants.GET_APIKEY_SUCCESS:
      return {
        loggedIn: true,
        user: user,
        apiKey: action.apiKey
      };
    case userConstants.GET_APIKEY_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}