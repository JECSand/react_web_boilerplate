/*
Author: Connor Sanders
MIT License
React.js Web Client Boilerplate
9/02/2019
*/

import { groupConstants } from '../constants';

// Export groups reducers
export function groups(state = {}, action) {
    switch (action.type) {
        case groupConstants.CREATE_SUCCESS:
            return {
                ...state,
                items: state.items.concat(action.group)
            };
        case groupConstants.MODIFY_SUCCESS:
            return {
                ...state,
                items: state.items.map(group =>
                    group.uuid === action.group.uuid
                        ? { ...group, name: action.group.name }
                        : group
                )
            };
        case groupConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case groupConstants.GETALL_SUCCESS:
            return {
                items: action.groups
            };
        case groupConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case groupConstants.DELETE_REQUEST:
            // Add 'deleting:true' property to group being deleted
            return {
                ...state,
                items: state.items.map(group =>
                    group.uuid === action.id
                        ? { ...group, deleting: true }
                        : group
                )
            };
        case groupConstants.DELETE_SUCCESS:
            // Remove deleted group from state
            return {
                items: state.items.filter(group => group.uuid !== action.id)
            };
        case groupConstants.DELETE_FAILURE:
            // Remove 'deleting:true' property and add 'deleteError:[error]' property to group
            return {
                ...state,
                items: state.items.map(group => {
                    if (group.uuid === action.id) {
                        // Make copy of group without 'deleting:true' property
                        const { deleting, ...groupCopy } = group;
                        // Return copy of group with 'deleteError:[error]' property
                        return { ...groupCopy, deleteError: action.error };
                    }
                    return group;
                })
            };
        default:
            return state
    }
}