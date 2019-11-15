/*
Authors: Connor Sanders and Taylor Smith
MIT License
React.js Web Client Boilerplate
9/06/2019
*/

import { todoService } from '../services';
import { alertSuccess, alertError } from "./alert.actions";
import {
    CREATE_FAILURE,
    CREATE_REQUEST,
    CREATE_SUCCESS,
    DELETE_FAILURE,
    DELETE_REQUEST,
    DELETE_SUCCESS,
    GETALL_FAILURE,
    GETALL_REQUEST,
    GETALL_SUCCESS,
    MODIFY_FAILURE,
    MODIFY_REQUEST,
    MODIFY_SUCCESS
} from "./actionTypes";

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
                    dispatch(alertSuccess('Todo successfully created'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertError(error.toString()));
                }
            );
    };
    function request(todo) { return { type: CREATE_REQUEST, todo } }
    function success(todo) { return { type: CREATE_SUCCESS, todo } }
    function failure(error) { return { type: CREATE_FAILURE, error } }
}

function modify(todo) {
    return dispatch => {
        dispatch(request(todo));
        todoService.update(todo)
            .then(
                todo => {
                    dispatch(success(todo));
                    dispatch(alertSuccess('Todo successfully modified'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertError(error.toString()));
                }
            );
    };
    function request(todo) { return { type: MODIFY_REQUEST, todo } }
    function success(todo) { return { type: MODIFY_SUCCESS, todo } }
    function failure(error) { return { type: MODIFY_FAILURE, error } }
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
    function request() { return { type: GETALL_REQUEST } }
    function success(todos) { return { type: GETALL_SUCCESS, todos } }
    function failure(error) { return { type: GETALL_FAILURE, error } }
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
    function request(id) { return { type: DELETE_REQUEST, id } }
    function success(id) { return { type: DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: DELETE_FAILURE, id, error } }
}