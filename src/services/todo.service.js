/*
Author: Connor Sanders
MIT License
React.js Web Client Boilerplate
9/06/2019
*/


import config from 'config';
import {authHeader} from '../helpers';
import {handleResponse} from '../utility_functions';

// Export Todos Service Functions
export const todoService = {
    getAll,
    getById,
    update,
    delete: _delete
};


// Service function that retrieves an array of all todos from API backend
function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/todos`, requestOptions).then(handleResponse);
}


// Service function that gets a specific todos by the todos's uuid
function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/todos/${id}`, requestOptions).then(handleResponse);
}


// Service function that sends a Patch request to the API backend to update an existing todos
function update(group) {
    const requestOptions = {
        method: 'PATCH',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(group)
    };
    return fetch(`${config.apiUrl}/todos/${group.id}`, requestOptions).then(handleResponse);
}


// Service function that deletes a todos by sending a Delete request to the API backend
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/todos/${id}`, requestOptions).then(handleResponse);
}
