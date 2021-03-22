import { call, put } from 'redux-saga/effects'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AppActions from '../Redux/AppRedux'

export function* appStartAttempt(api, action) {
    const { accessToken, baseUrl } = action.data
    api.setBaseURL(baseUrl)
    if (accessToken) {
        api.setHeaders(accessToken)
    }
}

export function* exchangeTokenAttempt(api, action) {
    try {
        const response = yield call(api.alpacaExchangeToken, action.data)
        console.log(12212, response)
        if (response.ok) {
            const { access_token } = response.data
            AsyncStorage.setItem('accessToken', access_token)
            api.setHeaders(access_token)
            yield put(AppActions.exchangeTokenSuccess(access_token))
        } else {
            const message = response.data.message || 'Something went wrong'
            yield put(AppActions.exchangeTokenFailure(message))
        }
    } catch (error) {
        yield put(AppActions.exchangeTokenFailure(error.message))
    }
}
