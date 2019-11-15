/*
Authors: Connor Sanders and Taylor Smith
MIT License
React.js Web Client Boilerplate
9/06/2019
*/

import { groupService } from '../services';
import {alertSuccess, alertError} from "./alert.actions";
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

export const groupActions = {
    create,
    modify,
    getAll,
    delete: _delete
};

function create(group) {
    return dispatch => {
        dispatch(request(group));
        groupService.create(group)
            .then(
                group => {
                    dispatch(success(group));
                    dispatch(alertSuccess('Group successfully created'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertError(error.toString()));
                }
            );
    };
    function request(group) { return { type: CREATE_REQUEST, group } }
    function success(group) { return { type: CREATE_SUCCESS, group } }
    function failure(error) { return { type: CREATE_FAILURE, error } }
}

function modify(group) {
    return dispatch => {
        dispatch(request(group));
        groupService.update(group)
            .then(
                group => {
                    dispatch(success(group));
                    dispatch(alertSuccess('Group successfully modified'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertError(error.toString()));
                }
            );
    };
    function request(group) { return { type: MODIFY_REQUEST, group } }
    function success(group) { return { type: MODIFY_SUCCESS, group } }
    function failure(error) { return { type: MODIFY_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());
        groupService.getAll()
            .then(
                groups => dispatch(success(groups)),
                error => dispatch(failure(error.toString()))
            );
    };
    function request() { return { type: GETALL_REQUEST } }
    function success(groups) { return { type: GETALL_SUCCESS, groups } }
    function failure(error) { return { type: GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));
        groupService.delete(id)
            .then(
                group => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };
    function request(id) { return { type: DELETE_REQUEST, id } }
    function success(id) { return { type: DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: DELETE_FAILURE, id, error } }
}