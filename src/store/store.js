import {compose, createStore, applyMiddleware} from "redux";
import {rootReducer} from "./root-reducer";
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {loggerMiddleware} from "./middleware/logger";
import createSagaMiddleware from "redux-saga"
import {rootSaga} from "./root-saga";


// Root reducer

// Currying a function which returns another function

// Chained curried function


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer)


const middlewares = [process.env.NODE_ENV !== 'production' && loggerMiddleware, sagaMiddleware ].filter(Boolean)


const composeEnhancer =
    (process.env.NODE_ENV !== 'production' &&
        window &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, undefined, composedEnhancers)

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)
