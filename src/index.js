import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {Provider} from 'react-redux'
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {persistor, store} from "./store/store";
import {PersistGate} from "redux-persist/integration/react";
import {Elements}  from '@stripe/react-stripe-js';
import {stripePromise} from "./utils/stripe/stripe.utils";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <Elements stripe={stripePromise}>
                        <App/>
                    </Elements>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
