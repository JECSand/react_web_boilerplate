/*
Author: Connor Sanders
MIT License
React.js Web Client Boilerplate
9/06/2019
*/

import { todoConstants } from '../constants';
import { todoService } from '../services';

export const todoActions = {
    getAll,
    delete: _delete
};

function getAll() {
    return dispatch => {
        dispatch(request());
        todoService.getAll()
            .then(
                todos => dispatch(success(todos)),
                error => dispatch(failure(error.toString()))
            );
    };
    function request() { return { type: todoConstants.GETALL_REQUEST } }
    function success(todos) { return { type: todoConstants.GETALL_SUCCESS, todos } }
    function failure(error) { return { type: todoConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));
        todoService.delete(id)
            .then(
                todo => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };
    function request(id) { return { type: todoConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: todoConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: todoConstants.DELETE_FAILURE, id, error } }
}