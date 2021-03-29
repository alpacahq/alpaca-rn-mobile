import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
    getPositionsAttempt: ['showLoading'],
    getPositionsSuccess: ['data'],
    getPositionsFailure: ['error']
})

export const PositionsTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
    positions: [],
    status: '',
    fetching: true,
    errorMessage: '',
    error: false
})

export const getPositionsAttempt = (state, action) => {
    const { showLoading } = action
    return state.merge({
        fetching: showLoading,
        error: false,
        errorMessage: ''
    })
}

export const getPositionsSuccess = (state, action) => {
    return state.merge({
        fetching: false,
        error: false,
        errorMessage: '',
        positions: action.data
    })
}

export const getPositionsFailure = (state, action) => {
    return state.merge({
        fetching: false,
        error: true,
        errorMessage: action.error
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_POSITIONS_ATTEMPT]: getPositionsAttempt,
    [Types.GET_POSITIONS_SUCCESS]: getPositionsSuccess,
    [Types.GET_POSITIONS_FAILURE]: getPositionsFailure
})
