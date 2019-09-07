/*
Author: Connor Sanders
MIT License
React.js Web Client Boilerplate
9/02/2019
*/

import { alertConstants } from '../constants';

// Export app's alert reducers
export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: 'alert-danger',
        message: action.message
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state
  }
}