import {takeEvery} from 'redux-saga'
import {call} from 'redux-saga/effects'
import {attemptLogin, attemptLogout, deleteData, getData, patchData, postData, searchData} from "../httpClient"
import config from 'config';
import {history} from "../helpers/history";
import {put} from "@redux-saga/core/effects";
import {alertError, alertSuccess, generateAPIKey} from "../actions";
import {
    USERS_LOGIN_REQUEST,
    USERS_LOGIN_SUCCESS,
    USERS_LOGIN_FAILURE,
    USERS_LOGOUT,
    USERS_REGISTER_REQUEST,
    USERS_REGISTER_SUCCESS,
    USERS_REGISTER_FAILURE,
    USERS_MODIFY_REQUEST,
    USERS_PROFILE_MODIFY_SUCCESS,
    USERS_MODIFY_SUCCESS,
    USERS_MODIFY_FAILURE,
    USERS_CREATE_REQUEST,
    USERS_CREATE_SUCCESS,
    USERS_CREATE_FAILURE,
    USERS_GETALL_REQUEST,
    USERS_GETALL_FAILURE,
    USERS_GETALL_SUCCESS,
    USERS_DELETE_REQUEST,
    USERS_DELETE_SUCCESS,
    USERS_DELETE_FAILURE,
    USERS_PASSWORD_REQUEST,
    USERS_PASSWORD_FAILURE,
    USERS_PASSWORD_SUCCESS,
    USERS_GET_APIKEY_REQUEST,
    USERS_GET_APIKEY_FAILURE,
    USERS_GET_APIKEY_SUCCESS
} from "../actions/actionTypes";

//TODO: Should make action creators for some of the actions dispatched here 'on the fly'

export function* watchLoginSaga() {
    yield* takeEvery(USERS_LOGIN_REQUEST, loginSaga)
}

export function* loginSaga({logInCreds}) {
    try {
        //TODO: Might need to dispatch to store here but p. sure USERS_LOGIN_REQUEST GOES TO REDUCER ALSO
        const user = yield call(attemptLogin, JSON.stringify(logInCreds));
        yield put({type: USERS_LOGIN_SUCCESS, user})
        history.push('/')
    } catch (e) {
        yield put({type: USERS_LOGIN_FAILURE, e})
        yield put(alertError(e))
    }
}

export function* watchLogoutSaga() {
    yield* takeEvery(USERS_LOGOUT, logoutSaga)
}

export function* logoutSaga() {
    try {
        yield call(attemptLogout);
    } catch (e) {
        //TODO: Error handling?
    }
}

export function* watchUserRegisterSaga() {
    yield* takeEvery(USERS_REGISTER_REQUEST, userRegisterSaga)
}

export function* userRegisterSaga({userInfo}) {
    try {
        yield call(postData, `${config.apiUrl}/auth/register`, userInfo);
        //TODO: need to refactor out handleResponse util function and implement error handling here if
        // it doesn't already work just based on error codes
        yield put({type: USERS_REGISTER_SUCCESS}) //TODO: Do we need the user here?
        history.push('/login')
        yield put(alertSuccess('Registration successful'))
    } catch (e) {
        yield put({type: USERS_REGISTER_FAILURE, error: e.toString()})
        yield put(alertError(e.toString()))
    }
}

export function* watchUserCreateSaga() {
    yield* takeEvery(USERS_CREATE_REQUEST, userCreateSaga)
}

export function* userCreateSaga({user}) {
    try {
        const response = yield call(postData, `${config.apiUrl}/users`, JSON.stringify(user));
        const text = yield response.text();
        const newUser = text && JSON.parse(text)
        yield put({type: USERS_CREATE_SUCCESS, user: newUser})
        yield put(alertSuccess('User successfully created'))
    } catch (e) {
        yield put({type: USERS_CREATE_FAILURE, error: e.toString()})
        yield put(alertError(e.toString()))
    }
}

export function* watchUserModifySaga() {
    yield* takeEvery(USERS_MODIFY_REQUEST, userModifySaga)
}

export function* userModifySaga({user}) {
    try {
        const response = yield call(patchData, `${config.apiUrl}/users/${user.uuid}`, JSON.stringify(user));
        const text = yield response.text();
        const updatedUser = text && JSON.parse(text)
        const currentUser = JSON.parse(localStorage.getItem('user'))
        if (currentUser.uuid === updatedUser.uuid) {
            localStorage.setItem('user', JSON.stringify(updatedUser));
            yield put({type: USERS_PROFILE_MODIFY_SUCCESS, user: updatedUser})
            yield put(alertSuccess('Profile successfully modified'))
        } else {
            yield put({type: USERS_MODIFY_SUCCESS, user: updatedUser})
            yield put(alertSuccess('User successfully modified'))
        }
    } catch (e) {
        yield put({type: USERS_MODIFY_FAILURE, error: e.toString()})
        yield put(alertError(e.toString()))
    }
}

export function* watchUsersGetAllSaga() {
    yield* takeEvery(USERS_GETALL_REQUEST, usersGetAllSaga)
}

export function* usersGetAllSaga() {
    try {
        const response = yield call(getData, `${config.apiUrl}/users`);
        const text = yield response.text();
        const users = text && JSON.parse(text)
        yield put({type: USERS_GETALL_SUCCESS, users})
    } catch (e) {
        yield put({type: USERS_GETALL_FAILURE, error: e.toString()})
    }
}

export function* watchUserDeleteSaga() {
    yield* takeEvery(USERS_DELETE_REQUEST, userDeleteSaga)
}

export function* userDeleteSaga({id}) {
    try {
        yield call(deleteData, `${config.apiUrl}/users/${id}`);
        yield put({type: USERS_DELETE_SUCCESS, id})
    } catch (e) {
        yield put({type: USERS_DELETE_FAILURE, id, error: e.toString()})
    }
}

export function* watchUserUpdatePasswordSaga() {
    yield* takeEvery(USERS_PASSWORD_REQUEST, userUpdatePasswordSaga)
}

export function* userUpdatePasswordSaga({updateObject}) {
    try {
        yield call(postData, `${config.apiUrl}/auth/password`, updateObject)
        yield put({type: USERS_PASSWORD_SUCCESS })
        yield put(alertSuccess('Password update successful'))
    } catch(e) {
        yield put({type: USERS_PASSWORD_FAILURE, error: e.toString()})
        yield put(alertError(e.toString()))
    }
}

export function* watchGenerateAPIKey() {
    yield* takeEvery(USERS_GET_APIKEY_REQUEST, generateAPIKeySaga)
}

export function* generateAPIKeySaga() {
    try {
        const response = yield call(getData, `${config.apiUrl}/auth/api-key`);
        const text = yield response.text();
        const apiKey = text && JSON.parse(text)
        yield put({type: USERS_GET_APIKEY_SUCCESS, apiKey})
    } catch(e) {
        yield put({type: USERS_GET_APIKEY_FAILURE, error: e.toString()})
    }

}

