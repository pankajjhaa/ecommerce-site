import {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import {useDispatch} from "react-redux";
import {checkUserSession} from "./store/user/user.action";
import Payment from "./routes/payment/payment.component";
import OrderSuccess from "./routes/order-success/order-success.component";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(checkUserSession())
    }, []);

    return (

        <>
            <Routes>
                <Route path='/' element={<Navigation/>}>
                    <Route index element={<Home/>}/>
                    <Route path='shop/*' element={<Shop/>}/>
                    <Route path='auth' element={<Authentication/>}/>
                    <Route path='checkout' element={<Checkout/>}/>
                    <Route path='payment' element={<Payment/>}/>
                    <Route path='order-success' element={<OrderSuccess/>}/>
                </Route>
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

        </>

    );
};

export default App;
