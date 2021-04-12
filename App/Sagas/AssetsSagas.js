import { call, put, select } from 'redux-saga/effects'
import AssetsActions from '../Redux/AssetsRedux'

const getLastRequestTime = (state) => state.assets.lastRequestTime

export function* getAssetsAttempt(api, action) {
    try {
        const response = yield call(api.getAssets)
        if (response.ok) {
            let assets = response.data
            yield put(AssetsActions.getAssetsSuccess(assets))

            // let i, j, temparray, chunk = 200 //Split array into chunks
            // for (i = 0, j = assets.length; i < j; i += chunk) {
            //     temparray = assets.slice(i, i+chunk)
            //     let symbols = ''
            //     temparray.map(item => {
            //         let div = symbols.length > 0 ? ',' : ''
            //         symbols = symbols + div + item.symbol
            //     })
            //     yield put(AssetsActions.getBarsAttempt('1Min', symbols, getTodayStart(), getTodayEnd(), 'today'))
            //     yield put(AssetsActions.getBarsAttempt('1Day', symbols, getYesterdayStart(), getYesterdayEnd(), 'yesterday'))
            // }
        } else {
            const message = response.data.message || 'Something went wrong'
            yield put(AssetsActions.getAssetsFailure(message))
        }
    } catch (error) {
        yield put(AssetsActions.getAssetsFailure(error.message))
    }
}

export function* getBarsAttempt(api, action) {
    const lastRequestTime = yield select(getLastRequestTime)
    const { timeframe, symbols, start, end, day } = action
    try {
        const response = yield call(api.getBars, timeframe, symbols, start, end)
        if (response.ok) {
            yield put(
                AssetsActions.getBarsSuccess(
                    response.data,
                    day,
                    lastRequestTime
                )
            )
        } else {
            const message = response.data.message || 'Something went wrong'
            yield put(AssetsActions.getBarsFailure(message))
        }
    } catch (error) {
        yield put(AssetsActions.getBarsFailure(error.message))
    }
}
