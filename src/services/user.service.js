/*
Author: Connor Sanders
MIT License
React.js Web Client Boilerplate
9/06/2019
*/

import config from 'config';
import { authHeader } from '../helpers';

// Export Users Services Functions
export const userService = {
    login,
    logout,
    register,
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
    return fetch(`${config.apiUrl}/signup`, requestOptions).then(handleResponse);
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

/*
TODO(Connor) Abstract the following 3 functions and eliminate the redundant code
*/

// Handler function for regular requests
function handleResponse(response) {
    console.log(response);
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

// Handler function for login requests
function handleLogInResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        let authToken = JSON.stringify(response.headers.get('Auth-Token'));
        localStorage.setItem('auth', authToken);
        return data;
    });
}

// Handler function for logout requests
function handleLogOutResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        localStorage.removeItem('user');
        localStorage.removeItem('auth');
        return data;
    });
}