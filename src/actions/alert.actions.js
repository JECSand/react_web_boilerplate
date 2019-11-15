/*
Authors: Connor Sanders and Taylor Smith
MIT License
React.js Web Client Boilerplate
9/01/2019
*/

import { ALERT_SUCCESS, ALERT_ERROR, ALERT_CLEAR } from './actionTypes';

// Handle alert success action
export const alertSuccess = message => ({ type: ALERT_SUCCESS, message });

// Handle alert error action
export const alertError = message => ({ type: ALERT_ERROR, message });

// Clear alerts action
export const alertClear = () => ({ type: ALERT_CLEAR });