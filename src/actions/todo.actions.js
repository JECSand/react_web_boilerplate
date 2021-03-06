/*
Author: Connor Sanders
MIT License
React.js Web Client Boilerplate
9/06/2019
*/

import { todoConstants } from '../constants';
import { todoService } from '../services';
import { alertActions } from "./alert.actions";

export const todoActions = {
    create,
    modify,
    getAll,
    delete: _delete
};

function create(todo) {
    return dispatch => {
        dispatch(request(todo));
        todoService.create(todo)
            .then(
                todo => {
                    dispatch(success(todo));
                    dispatch(alertActions.success('Todo successfully created'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    function request(todo) { return { type: todoConstants.CREATE_REQUEST, todo } }
    function success(todo) { return { type: todoConstants.CREATE_SUCCESS, todo } }
    function failure(error) { return { type: todoConstants.CREATE_FAILURE, error } }
}

function modify(todo) {
    return dispatch => {
        dispatch(request(todo));
        todoService.update(todo)
            .then(
                todo => {
                    dispatch(success(todo));
                    dispatch(alertActions.success('Todo successfully modified'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    function request(todo) { return { type: todoConstants.MODIFY_REQUEST, todo } }
    function success(todo) { return { type: todoConstants.MODIFY_SUCCESS, todo } }
    function failure(error) { return { type: todoConstants.MODIFY_FAILURE, error } }
}

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