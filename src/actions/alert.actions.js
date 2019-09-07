/*
Author: Connor Sanders
MIT License
React.js Web Client Boilerplate
9/01/2019
*/


import { alertConstants } from '../constants';

// Export alert action handlers
export const alertActions = {
    success,
    error,
    clear
};

// Handle alert success action
function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

// Handle alert error action
function error(message) {
    return { type: alertConstants.ERROR, message };
}

// Clear alerts action
function clear() {
    return { type: alertConstants.CLEAR };
}