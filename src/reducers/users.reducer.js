/*
Author: Connor Sanders
MIT License
React.js Web Client Boilerplate
9/02/2019
*/

import { userConstants } from '../constants';

// Export users reducers
export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case userConstants.DELETE_REQUEST:
      // Add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.uuid === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      // Remove deleted user from state
      return {
        items: state.items.filter(user => user.uuid !== action.id)
      };
    case userConstants.CREATE_SUCCESS:
      return {
        ...state,
        items: state.items.concat(action.user)
      };
    case userConstants.DELETE_FAILURE:
      // Remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map(user => {
          if (user.uuid === action.id) {
            // Make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // Return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }
          return user;
        })
      };
    default:
      return state
  }
}