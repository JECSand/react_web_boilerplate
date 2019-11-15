/*
Authors: Connor Sanders and Taylor Smith
MIT License
React.js Web Client Boilerplate
9/02/2019
*/

import {todoConstants} from '../constants';

// Export groups reducers
export function todos(state = {}, action) {
    switch (action.type) {
        case todoConstants.CREATE_SUCCESS:
            return {
                ...state,
                items: state.items ? state.items.concat(action.todo) : [action.todo]
            };
        case todoConstants.MODIFY_SUCCESS:
            return {
                ...state,
                items: state.items.map(todo =>
                    todo.uuid === action.todo.uuid
                        ? { ...todo, name: action.todo.name, due: action.todo.due, description: action.todo.description }
                        : todo
                )
            };
        case todoConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case todoConstants.GETALL_SUCCESS:
            return {
                items: action.todos
            };
        case todoConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case todoConstants.DELETE_REQUEST:
            // Add 'deleting:true' property to group being deleted
            return {
                ...state,
                items: state.items.map(todo =>
                    todo.uuid === action.id
                        ? { ...todo, deleting: true }
                        : todo
                )
            };
        case todoConstants.DELETE_SUCCESS:
            // Remove deleted group from state
            return {
                items: state.items.filter(todo => todo.uuid !== action.id)
            };
        case todoConstants.DELETE_FAILURE:
            // Remove 'deleting:true' property and add 'deleteError:[error]' property to group
            return {
                ...state,
                items: state.items.map(todo => {
                    if (todo.uuid === action.id) {
                        // Make copy of group without 'deleting:true' property
                        const { deleting, ...todoCopy } = todo;
                        // Return copy of group with 'deleteError:[error]' property
                        return { ...todoCopy, deleteError: action.error };
                    }
                    return todo;
                })
            };
        default:
            return state
    }
}