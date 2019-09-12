/*
Author: Connor Sanders
MIT License
React.js Web Client Boilerplate
9/06/2019
*/

/*
TODO(Connor) Abstract the following 3 functions and eliminate the redundant code
*/
import { userService } from '../services';

// Handler function for regular requests
export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                userService.logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

// Handler function for login requests
export function handleAPIKeyResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                userService.logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return JSON.stringify(response.headers.get('API-Key'));
    });
}

// Handler function for login requests
export function handleLogInResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                userService.logout();
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
export function handleLogOutResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        localStorage.removeItem('user');
        localStorage.removeItem('auth');
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}