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
    create,
    getAll,
    getById,
    update,
    delete: _delete
};


// Service function that sends a post request to the API backend to create a new todos
function create(todo) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
    };
    return fetch(`${config.apiUrl}/todos`, requestOptions).then(handleResponse);
}

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
function update(todo) {
    const requestOptions = {
        method: 'PATCH',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
    };
    return fetch(`${config.apiUrl}/todos/${todo.uuid}`, requestOptions).then(handleResponse);
}


// Service function that deletes a todos by sending a Delete request to the API backend
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/todos/${id}`, requestOptions).then(handleResponse);
}
