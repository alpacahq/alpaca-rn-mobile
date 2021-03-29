import { call, put } from 'redux-saga/effects'
import OrdersActions from '../Redux/OrdersRedux'
import { showAlertMessage, getTodayStart, getTodayEnd } from '../Util/Helper'

export function* getOrdersAttempt(api, action) {
    const { status, params } = action
    try {
        const response = yield call(api.getOrders, status, params)
        if (response.ok) {
            yield put(OrdersActions.getOrdersSuccess(response.data, status))
        } else {
            const message = response.data.message || 'Something went wrong'
            yield put(OrdersActions.getOrdersFailure(message))
        }
    } catch (error) {
        yield put(OrdersActions.getOrdersFailure(error.message))
    }
}

export function* cancelOrderAttempt(api, action) {
    const { order_id } = action
    try {
        const response = yield call(api.cancelOrder, order_id)
        if (response.ok) {
            // showAlertMessage("Cancel order success", "success")
            yield put(OrdersActions.cancelOrderSuccess(response.data))
            yield put(
                OrdersActions.getOrdersAttempt(
                    'closed',
                    `after=${getTodayStart()}&until=${getTodayEnd()}`
                )
            )
            yield put(
                OrdersActions.getOrdersAttempt(
                    'open',
                    `after=${getTodayStart()}&until=${getTodayEnd()}`
                )
            )
        } else {
            const message = response.data.message || 'Something went wrong'
            yield put(OrdersActions.cancelOrderFailure(message))
        }
    } catch (error) {
        yield put(OrdersActions.cancelOrderFailure(error.message))
    }
}

export function* postOrderAttempt(api, action) {
    const { data, order_type } = action
    try {
        const response = yield call(api.postOrder, data)
        if (response.ok) {
            if (order_type === 'single') {
                showAlertMessage('Post order success', 'success')
            }
            yield put(OrdersActions.postOrderSuccess(response.data))
            yield put(
                OrdersActions.getOrdersAttempt(
                    'closed',
                    `after=${getTodayStart()}&until=${getTodayEnd()}`
                )
            )
            yield put(
                OrdersActions.getOrdersAttempt(
                    'open',
                    `after=${getTodayStart()}&until=${getTodayEnd()}`
                )
            )
        } else {
            const message = response.data.message || 'Something went wrong'
            if (order_type === 'single') {
                showAlertMessage(message, 'danger')
            }
            yield put(OrdersActions.postOrderFailure(message))
        }
    } catch (error) {
        yield put(OrdersActions.postOrderFailure(error.message))
    }
}
