import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
    getAssetsAttempt: null,
    getAssetsSuccess: ['data'],
    getAssetsFailure: ['error'],
    getBarsAttempt: ['timeframe', 'symbols', 'start', 'end', 'day'],
    getBarsSuccess: ['data', 'day', 'lastRequestTime'],
    getBarsFailure: ['error'],
    resetBars: null
})

export const AssetsTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
    assets: [],
    bars: null,
    preBars: null,
    fetching: false,
    barFetching: false,
    lastRequestTime: null,
    getBarApiCallNo: 1,
    errorMessage: '',
    error: false
})

export const getAssetsAttempt = (state, action) => {
    return state.merge({ fetching: true, error: false, errorMessage: '' })
}

export const getAssetsSuccess = (state, action) => {
    return state.merge({
        fetching: false,
        error: false,
        errorMessage: '',
        assets: action.data
    })
}

export const getAssetsFailure = (state, action) => {
    return state.merge({
        fetching: false,
        error: true,
        errorMessage: action.error
    })
}

export const getBarsAttempt = (state, action) => {
    return state.merge({ barFetching: true })
}

export const getBarsSuccess = (state, action) => {
    let { day, data } = action
    let newAssets = state.assets
    newAssets = newAssets.map((assetItem) => {
        // Reconfigure assets with bar data
        try {
            // TODO: bars API v2
            // let count = data[assetItem.symbol].length // bars v1
            let count = data['bars'].length // bars v2 (one symbol)
            // if (count > 0) { // bars v1
            // bars v2 (one symbol)
            if (count > 0 && assetItem.symbol === data['symbol']) {
                // let associatedBar = data[assetItem.symbol][count - 1] // Get last item
                let associatedBar = data['bars'][count - 1] // Get last item
                if (day === 'today') {
                    assetItem = {
                        ...assetItem,
                        todayBar: associatedBar
                    }
                } else {
                    assetItem = {
                        ...assetItem,
                        preBar: associatedBar
                    }
                }
            }
            return assetItem
        } catch (err) {
            return assetItem
        }
    })

    const limitCallNo = 2
    if (state.getBarApiCallNo >= limitCallNo) {
        return state.merge({
            barFetching: false,
            error: false,
            errorMessage: '',
            assets: newAssets,
            getBarApiCallNo: 1
        })
    } else {
        return state.merge({
            barFetching: true,
            error: false,
            errorMessage: '',
            assets: newAssets,
            getBarApiCallNo: state.getBarApiCallNo + 1
        })
    }
}

export const getBarsFailure = (state, action) => {
    return state.merge({
        barFetching: false,
        error: true,
        errorMessage: action.error
    })
}

export const resetBars = (state, action) =>
    state.merge({ bars: null, preBars: null })

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ASSETS_ATTEMPT]: getAssetsAttempt,
    [Types.GET_ASSETS_SUCCESS]: getAssetsSuccess,
    [Types.GET_ASSETS_FAILURE]: getAssetsFailure,
    [Types.GET_BARS_ATTEMPT]: getBarsAttempt,
    [Types.GET_BARS_SUCCESS]: getBarsSuccess,
    [Types.GET_BARS_FAILURE]: getBarsFailure
})
