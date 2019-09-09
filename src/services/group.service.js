/*
Author: Connor Sanders
MIT License
React.js Web Client Boilerplate
9/06/2019
*/


import config from 'config';
import {authHeader} from '../helpers';
import {handleResponse} from '../utility_functions';

// Export Group Service Functions
export const groupService = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};


// Service function that sends a post request to the API backend to create a new group
function create(group) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(group)
    };
    return fetch(`${config.apiUrl}/groups`, requestOptions).then(handleResponse);
}


// Service function that retrieves an array of all groups from API backend
function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/groups`, requestOptions).then(handleResponse);
}

// Service function that gets a specific group by the user's uuid
function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/groups/${id}`, requestOptions).then(handleResponse);
}


// Service function that sends a Patch request to the API backend to update an existing group
function update(group) {
    const requestOptions = {
        method: 'PATCH',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(group)
    };
    return fetch(`${config.apiUrl}/groups/${group.id}`, requestOptions).then(handleResponse);
}


// Service function that deletes a group by sending a Delete request to the API backend
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/groups/${id}`, requestOptions).then(handleResponse);
}
