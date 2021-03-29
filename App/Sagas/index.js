import { takeLatest, takeEvery } from 'redux-saga/effects'
import API from '../Services/Api'

/* ------------- Types ------------- */
import { AppTypes } from '../Redux/AppRedux'
import { AccountTypes } from '../Redux/AccountRedux'
import { OrdersTypes } from '../Redux/OrdersRedux'
import { PositionsTypes } from '../Redux/PositionsRedux'
import { AssetsTypes } from '../Redux/AssetsRedux'

/* ------------- Sagas ------------- */
import { appStartAttempt, exchangeTokenAttempt } from './AppSaga'
import { getAccountAttempt, configureAccountAttempt } from './AccountSagas'
import {
    getOrdersAttempt,
    cancelOrderAttempt,
    postOrderAttempt
} from './OrdersSagas'
import { getPositionsAttempt } from './PositionsSagas'
import { getAssetsAttempt, getBarsAttempt } from './AssetsSagas'

/* ------------- API ------------- */
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
    yield [
        takeLatest(AppTypes.APP_START_ATTEMPT, appStartAttempt, api),
        takeLatest(AppTypes.EXCHANGE_TOKEN_ATTEMPT, exchangeTokenAttempt, api),
        takeLatest(AccountTypes.GET_ACCOUNT_ATTEMPT, getAccountAttempt, api),
        takeLatest(
            AccountTypes.CONFIGURE_ACCOUNT_ATTEMPT,
            configureAccountAttempt,
            api
        ),
        takeEvery(OrdersTypes.GET_ORDERS_ATTEMPT, getOrdersAttempt, api),
        takeEvery(OrdersTypes.CANCEL_ORDER_ATTEMPT, cancelOrderAttempt, api),
        takeEvery(OrdersTypes.POST_ORDER_ATTEMPT, postOrderAttempt, api),
        takeLatest(
            PositionsTypes.GET_POSITIONS_ATTEMPT,
            getPositionsAttempt,
            api
        ),
        takeLatest(AssetsTypes.GET_ASSETS_ATTEMPT, getAssetsAttempt, api),
        takeEvery(AssetsTypes.GET_BARS_ATTEMPT, getBarsAttempt, api)
    ]
}
