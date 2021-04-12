import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

// creates the store
export default (rootReducer, rootSaga) => {
    /* ------------- Redux Configuration ------------- */

    const middleware = []
    const enhancers = []

    /* ------------- Saga Middleware ------------- */
    const sagaMiddleware = createSagaMiddleware()
    middleware.push(sagaMiddleware)

    /* ------------- Assemble Middleware ------------- */
    enhancers.push(applyMiddleware(...middleware))

    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const createAppropriateStore = createStore
    const store = createAppropriateStore(
        rootReducer,
        composeEnhancers(...enhancers)
    )

    // kick off root saga
    sagaMiddleware.run(rootSaga)

    return store
}
