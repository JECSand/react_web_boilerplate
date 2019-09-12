/*
Author: Connor Sanders
MIT License
React.js Web Client Boilerplate
9/01/2019
*/

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './helpers';
import { App } from './App';

// Setup fake backend for testing purposes
//import { configureFakeBackend } from './helpers';
//configureFakeBackend();

// Initialize and Render the App
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);