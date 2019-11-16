import axios from 'axios';
import getServerUrl from './helpers/urlResolver';
import {handleLogInResponse, handleLogOutResponse} from "./helpers/httpHelpers";
import {authHeader} from "./helpers/auth-header";
axios.defaults.baseURL = getServerUrl();
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.headers.patch['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.headers.put['Content-Type'] = 'application/json; charset=utf-8';

export function postData(urlPath, data) {
    return axios.post(urlPath, data, {headers: authHeader()}).then(response => {
        return response;
    })
}

export function attemptLogin(logInCreds) {
    return axios.post(`${process.env.REACT_APP_API_URL}/auth`, logInCreds)
        .then(handleLogInResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        })
}

export function attemptLogout() {
    return axios.delete(`${process.env.REACT_APP_API_URL}/auth`, {headers: authHeader()})
        .then(handleLogOutResponse)
}

export function putData(urlPath, data) {
    return axios.put(urlPath, data).then(response => {
        return response;
    }).catch();
}

export function patchData(urlPath, data) {
    return axios.patch(urlPath, data, {headers: authHeader()}).then(response => {
        return response;
    }).catch();
}

export function getData(urlPath) {
    return axios.get(urlPath, {headers: authHeader()}).then(response => {
        return response;
    });
}

export function searchData(urlPath, searchId) {
    return axios.get(urlPath + '?q=' + searchId).then(response => {
        return response;
    });
}

export function deleteData(urlPath){
    return axios.delete(urlPath).then(response => {
        return response;
    });
}