import {compose, createStore, applyMiddleware} from "redux";
import {rootReducer} from "./root-reducer";


// Root reducer

// Currying a function which returns another function

// Chained curried function
const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action);
    }

    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('currentState: ', store.getState());

    next(action);

    console.log('next state: ', store.getState());
}

const middlewares = [loggerMiddleware]

const composedEnhancers = compose(applyMiddleware(...middlewares))

export const store = createStore(rootReducer, undefined, composedEnhancers)
