/*
Authors: Connor Sanders and Taylor Smith
MIT License
React.js Web Client Boilerplate
9/06/2019
*/

import { authHeader } from '../helpers';
import { handleResponse, handleAPIKeyResponse, handleLogInResponse, handleLogOutResponse } from '../utility_functions';

// Export Users Service Functions
export const userService = {
    login,
    logout,
    register,
    create,
    getAll,
    getById,
    update,
    delete: _delete,
    updatePassword,
    generateAPIKey
};

// Service function that sends the API backend a post request logs a user in
function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password })
    };
    return fetch(`${process.env.REACT_APP_API_URL}/auth`, requestOptions)
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
    return fetch(`${process.env.REACT_APP_API_URL}/auth`, requestOptions).then(handleLogOutResponse);
    // remove user from local storage to log user out
}

// Service function that retrieves an array of all users from API backend
function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${process.env.REACT_APP_API_URL}/users`, requestOptions).then(handleResponse);
}

// Service function that gets a specific user by the user's uuid
function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, requestOptions).then(handleResponse);
}

// Service function that sends a post request to the API backend to register a new user
function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`${process.env.REACT_APP_API_URL}/auth/register`, requestOptions).then(handleResponse);
}

// Service function that sends a post request to the API backend to create a new user
function create(user) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`${process.env.REACT_APP_API_URL}/users`, requestOptions).then(handleResponse);
}

// Service function that sends a Patch request to the API backend to update an existing user
function update(user) {
    const requestOptions = {
        method: 'PATCH',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`${process.env.REACT_APP_API_URL}/users/${user.uuid}`, requestOptions).then(handleResponse);
}

// Service function that deletes a user by sending a Delete request to the API backend
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, requestOptions).then(handleResponse);
}

// Service function that updates a user's password
function updatePassword(updateObject) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(updateObject)
    };
    return fetch(`${process.env.REACT_APP_API_URL}/auth/password`, requestOptions).then(handleResponse);
}

// Service function that gets generates a 6 month API Key for a user
function generateAPIKey() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${process.env.REACT_APP_API_URL}/auth/api-key`, requestOptions)
        .then(handleAPIKeyResponse)
        .then(apiKey => {
            return apiKey;
        });
}