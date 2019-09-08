/*
Author: Connor Sanders
MIT License
React.js Web Client Boilerplate
9/06/2019
*/

import { groupConstants } from '../constants';
import { groupService } from '../services';

export const groupActions = {
    getAll,
    delete: _delete
};

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