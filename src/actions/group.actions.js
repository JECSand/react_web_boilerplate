/*
Author: Connor Sanders
MIT License
React.js Web Client Boilerplate
9/06/2019
*/

import {groupConstants } from '../constants';
import {groupService } from '../services';
import {alertActions} from "./alert.actions";

export const groupActions = {
    create,
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
                    dispatch(alertActions.success('Group successfully created'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    function request(group) { return { type: groupConstants.CREATE_REQUEST, group } }
    function success(group) { return { type: groupConstants.CREATE_SUCCESS, group } }
    function failure(error) { return { type: groupConstants.CREATE_FAILURE, error } }
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
    function request() { return { type: groupConstants.GETALL_REQUEST } }
    function success(groups) { return { type: groupConstants.GETALL_SUCCESS, groups } }
    function failure(error) { return { type: groupConstants.GETALL_FAILURE, error } }
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
    function request(id) { return { type: groupConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: groupConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: groupConstants.DELETE_FAILURE, id, error } }
}