/*
Authors: Connor Sanders and Taylor Smith
MIT License
React.js Web Client Boilerplate
9/06/2019
*/

import {
    USERS_CREATE_REQUEST,
    USERS_DELETE_REQUEST,
    USERS_GET_APIKEY_REQUEST,
    USERS_GETALL_REQUEST,
    USERS_LOGIN_REQUEST,
    USERS_LOGOUT,
    USERS_MODIFY_REQUEST,
    USERS_PASSWORD_REQUEST,
    USERS_REGISTER_REQUEST
} from "./actionTypes";

export const userActions = {
    login,
    logout,
    register,
    getAll,
    create,
    modify,
    delete: _delete,
    updatePassword,
    generateAPIKey
};

export const login = (username, password) => ({ type: USERS_LOGIN_REQUEST, logInCreds: {username, password} })
export const logout = () => ({ type: USERS_LOGOUT })
export const register = userInfo => ({ type: USERS_REGISTER_REQUEST, userInfo })
export const create = user => ({ type: USERS_CREATE_REQUEST, user })
export const modify = user => ({ type: USERS_MODIFY_REQUEST, user })
export const getAll = () => ({ type: USERS_GETALL_REQUEST })
export const _delete = id => ({ tyep: USERS_DELETE_REQUEST, id })
export const updatePassword = updateObject => ({ type: USERS_PASSWORD_REQUEST, updateObject })
export const generateAPIKey = () => ({ type: USERS_GET_APIKEY_REQUEST })


// function _delete(id) {
//     return dispatch => {
//         dispatch(request(id));
//         userService.delete(id)
//             .then(
//                 user => dispatch(success(id)),
//                 error => dispatch(failure(id, error.toString()))
//             );
//     };
//     function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
//     function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
//     function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
// }
//
// function updatePassword(updateObject) {
//     return dispatch => {
//         dispatch(request(updateObject));
//         userService.updatePassword(updateObject)
//             .then(
//                 updateObject => {
//                     dispatch(success());
//                     dispatch(alertActions.success('Password update successful'));
//                 },
//                 error => {
//                     dispatch(failure(error.toString()));
//                     dispatch(alertActions.error(error.toString()));
//                 }
//             );
//     };
//     function request(updateObject) { return { type: userConstants.PASSWORD_REQUEST, updateObject } }
//     function success(updateObject) { return { type: userConstants.PASSWORD_SUCCESS, updateObject } }
//     function failure(error) { return { type: userConstants.PASSWORD_FAILURE, error } }
// }
//
// function generateAPIKey() {
//     return dispatch => {
//         dispatch(request());
//         userService.generateAPIKey()
//             .then(
//                 apiKey => dispatch(success(apiKey)),
//                 error => dispatch(failure(error.toString()))
//             );
//     };
//     function request() { return { type: userConstants.GET_APIKEY_REQUEST } }
//     function success(apiKey) { return { type: userConstants.GET_APIKEY_SUCCESS, apiKey } }
//     function failure(error) { return { type: userConstants.GET_APIKEY_FAILURE, error } }
// }
// function getAll() {
//     return dispatch => {
//         dispatch(request());
//         userService.getAll()
//             .then(
//                 users => dispatch(success(users)),
//                 error => dispatch(failure(error.toString()))
//             );
//     };
//     function request() { return { type: userConstants.GETALL_REQUEST } }
//     function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
// }
// export const login = (username, password) => {
//     return dispatch => {
//         dispatch(request({ username }));
//         userService.login(username, password)
//             .then(
//                 user => {
//                     dispatch(success(user));
//                     history.push('/');
//                 },
//                 error => {
//                     dispatch(failure(error.toString()));
//                     dispatch(alertActions.error(error.toString()));
//                 }
//             );
//     };
//     function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
//     function success(user) { return { type: userConstants.LOGIN_SUCCESS, user    } }
//     function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
// }

// function logout() {
//     userService.logout();
//     return { type: userConstants.LOGOUT };
// }

// function register(user) {
//     return dispatch => {
//         dispatch(request(user));
//
//         userService.register(user)
//             .then(
//                 user => {
//                     dispatch(success());
//                     history.push('/login');
//                     dispatch(alertActions.success('Registration successful'));
//                 },
//                 error => {
//                     dispatch(failure(error.toString()));
//                     dispatch(alertActions.error(error.toString()));
//                 }
//             );
//     };
//     function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
//     function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
//     function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
// }

// function create(user) {
//     return dispatch => {
//         dispatch(request(user));
//         userService.create(user)
//             .then(
//                 user => {
//                     dispatch(success(user));
//                     dispatch(alertActions.success('User successfully created'));
//                 },
//                 error => {
//                     dispatch(failure(error.toString()));
//                     dispatch(alertActions.error(error.toString()));
//                 }
//             );
//     };
//     function request(user) { return { type: userConstants.CREATE_REQUEST, user } }
//     function success(user) { return { type: userConstants.CREATE_SUCCESS, user } }
//     function failure(error) { return { type: userConstants.CREATE_FAILURE, error } }
// }

// function modify(user) {
//     return dispatch => {
//         dispatch(request(user));
//         userService.update(user)
//             .then(
//                 user => {
//                     let curUser = JSON.parse(localStorage.getItem('user'));
//                     if (curUser.uuid === user.uuid) {
//                         localStorage.setItem('user', JSON.stringify(user));
//                         dispatch(successProfile(user));
//                         dispatch(alertActions.success('Profile successfully modified'));
//                     } else {
//                         dispatch(success(user));
//                         dispatch(alertActions.success('User successfully modified'));
//                     }
//                 },
//                 error => {
//                     dispatch(failure(error.toString()));
//                     dispatch(alertActions.error(error.toString()));
//                 }
//             );
//     };
//     function request(user) { return { type: userConstants.MODIFY_REQUEST, user } }
//     function success(user) { return { type: userConstants.MODIFY_SUCCESS, user } }
//     function successProfile(user) { return { type: userConstants.PROFILE_MODIFY_SUCCESS, user } }
//     function failure(error) { return { type: userConstants.MODIFY_FAILURE, error } }
// }


// prefixed function name with underscore because delete is a reserved word in javascript
