import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
    getAccountAttempt: null,
    getAccountSuccess: ['data'],
    getAccountFailure: ['error'],
    configureAccountAttempt: ['data'],
    configureAccountSuccess: null,
    configureAccountFailure: null
})

export const AccountTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
    account: [],
    fetching: true,
    errorMessage: '',
    error: false
})

export const getAccountAttempt = (state, action) => {
    return state.merge({ fetching: true, error: false, errorMessage: '' })
}

export const getAccountSuccess = (state, action) => {
    return state.merge({
        fetching: false,
        error: false,
        errorMessage: '',
        account: action.data
    })
}

export const getAccountFailure = (state, action) => {
    return state.merge({
        fetching: false,
        error: true,
        errorMessage: action.error
    })
}

export const configureAccountAttempt = (state, action) => {
    return state.merge({ fetching: true, error: false, errorMessage: '' })
}

export const configureAccountSuccess = (state, action) => {
    return state.merge({ fetching: false, error: false, errorMessage: '' })
}

export const configureAccountFailure = (state, action) => {
    return state.merge({
        fetching: false,
        error: true,
        errorMessage: action.error
    })
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ACCOUNT_ATTEMPT]: getAccountAttempt,
    [Types.GET_ACCOUNT_SUCCESS]: getAccountSuccess,
    [Types.GET_ACCOUNT_FAILURE]: getAccountFailure,
    [Types.CONFIGURE_ACCOUNT_ATTEMPT]: configureAccountAttempt,
    [Types.CONFIGURE_ACCOUNT_SUCCESS]: configureAccountSuccess,
    [Types.CONFIGURE_ACCOUNT_FAILURE]: configureAccountFailure
})
