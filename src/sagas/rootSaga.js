import { fork } from 'redux-saga/effects'
import {
    watchGenerateAPIKey,
    watchLoginSaga,
    watchLogoutSaga,
    watchUserCreateSaga, watchUserDeleteSaga,
    watchUserModifySaga,
    watchUserRegisterSaga, watchUsersGetAllSaga, watchUserUpdatePasswordSaga,
} from "./userSagas";

export default function* rootSaga() {
    yield [
        fork(watchLoginSaga),
        fork(watchLogoutSaga),
        fork(watchUserRegisterSaga),
        fork(watchUserCreateSaga),
        fork(watchUserModifySaga),
        fork(watchUsersGetAllSaga),
        fork(watchUserDeleteSaga),
        fork(watchUserUpdatePasswordSaga),
        fork(watchGenerateAPIKey)
    ];
}