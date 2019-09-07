/*
Author: Connor Sanders
MIT License
React.js Web Client Boilerplate
9/02/2019
*/

import { userConstants } from '../constants';

// Export registration reducer
export function registration(state = {}, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registering: true };
    case userConstants.REGISTER_SUCCESS:
      return {};
    case userConstants.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}