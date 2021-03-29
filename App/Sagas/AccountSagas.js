import { call, put } from 'redux-saga/effects'
import AccountActions from '../Redux/AccountRedux'
import { showAlertMessage } from '../Util/Helper'

export function* getAccountAttempt(api, action) {
    try {
        const response = yield call(api.getAccount)
        if (response.ok) {
            yield put(AccountActions.getAccountSuccess(response.data))
        } else {
            const message = response.data.message || 'Something went wrong'
            yield put(AccountActions.getAccountFailure(message))
        }
    } catch (error) {
        yield put(AccountActions.getAccountFailure(error.message))
    }
}

export function* configureAccountAttempt(api, action) {
    try {
        const response = yield call(api.configureAccount, action.data)
        if (response.ok) {
            yield put(AccountActions.configureAccountSuccess(response.data))
            yield put(AccountActions.getAccountAttempt())
        } else {
            const message = response.data.message || 'Something went wrong'
            showAlertMessage(message, 'danger')
            yield put(AccountActions.configureAccountFailure(message))
        }
    } catch (error) {
        yield put(AccountActions.configureAccountFailure(error.message))
    }
}
