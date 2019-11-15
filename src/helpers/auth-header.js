/*
Authors: Connor Sanders and Taylor Smith
MIT License
React.js Web Client Boilerplate
9/01/2019
*/

// Function that retrieves the JWT Auth-Token from localstorage and sets up the header format
export function authHeader() {
    let authStr = localStorage.getItem('auth');
    if (authStr !== null && authStr !== undefined) {
        try {
            let auth = JSON.parse(authStr);
            if (auth) {
                return { 'Auth-Token': auth };
            }
        } catch(e) {
            localStorage.removeItem('user');
            localStorage.removeItem('auth');
            return {};
        }
    }
    return {};
}