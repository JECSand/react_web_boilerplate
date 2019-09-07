/*
Author: Connor Sanders
MIT License
React.js Web Client Boilerplate
9/01/2019
*/

// Function that retrieves the JWT Auth-Token from localstorage and sets up the header format
export function authHeader() {
    let auth = JSON.parse(localStorage.getItem('auth'));
    if (auth) {
        return { 'Auth-Token': auth };
    } else {
        return {};
    }
}