import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
    appStartAttempt: ['data'],
    exchangeTokenAttempt: ['data'],
    exchangeTokenSuccess: ['data'],
    exchangeTokenFailure: ['error']
})

export const AppTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
    accessToken: null,
    fetching: false,
    errorMessage: '',
    error: false
})

/* ------------- Reducers ------------- */
export const appStartAttempt = (state, action) => {
    return state.merge({})
}

export const exchangeTokenAttempt = (state, action) => {
    return state.merge({ fetching: true, error: false, errorMessage: '' })
}

export const exchangeTokenSuccess = (state, action) => {
    return state.merge({
        fetching: false,
        error: false,
        errorMessage: '',
        accessToken: action.data
    })
}

export const exchangeTokenFailure = (state, action) => {
    return state.merge({
        fetching: false,
        error: true,
        errorMessage: action.error
    })
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.APP_START_ATTEMPT]: appStartAttempt,
    [Types.EXCHANGE_TOKEN_ATTEMPT]: exchangeTokenAttempt,
    [Types.EXCHANGE_TOKEN_SUCCESS]: exchangeTokenSuccess,
    [Types.EXCHANGE_TOKEN_FAILURE]: exchangeTokenFailure
})
