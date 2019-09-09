/*
Author: Connor Sanders
MIT License
React.js Web Client Boilerplate
9/06/2019
*/

import config from 'config';
import { authHeader } from '../helpers';
import { handleResponse, handleLogInResponse, handleLogOutResponse } from '../utility_functions';

// Export Users Service Functions
export const userService = {
    login,
    logout,
    register,
    create,
    getAll,
    getById,
    update,
    delete: _delete
};

// Service function that sends the API backend a post request logs a user in
function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password })
    };
    return fetch(`${config.apiUrl}/auth`, requestOptions)
        .then(handleLogInResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

// Service function that sends the API backend a delete request to end the current session
function logout() {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/auth`, requestOptions).then(handleLogOutResponse);
    // remove user from local storage to log user out
}

// Service function that retrieves an array of all users from API backend
function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

// Service function that gets a specific user by the user's uuid
function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

// Service function that sends a post request to the API backend to register a new user
function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`${config.apiUrl}/auth/register`, requestOptions).then(handleResponse);
}

// Service function that sends a post request to the API backend to create a new user
function create(user) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

// Service function that sends a Patch request to the API backend to update an existing user
function update(user) {
    const requestOptions = {
        method: 'PATCH',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
}

// Service function that deletes a user by sending a Delete request to the API backend
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}
