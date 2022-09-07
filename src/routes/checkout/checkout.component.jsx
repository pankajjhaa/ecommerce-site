import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss';
import {useSelector} from "react-redux";
import {selectCartItems, selectCartTotal} from "../../store/cart/cart.selector";
import {useLottie} from 'lottie-react';
import emptyCartLottie from '../../assets/lottie/empty-cart.json';
import {Link} from "react-router-dom";
import {PaymentButton} from "../../components/payment-form/payment-form.styles";
import {BUTTON_TYPES_CLASSES} from "../../components/button/button.component";

const Checkout = () => {

    const cartItems = useSelector(selectCartItems)
    const cartTotal = useSelector(selectCartTotal)

    const options = {
        animationData: emptyCartLottie,
        loop: true,
        width: "50%"
    };

    const {View} = useLottie(options);
    return (

        <>
            {cartItems.length > 0 ?
                <div className='checkout-container'>
                    <div className='checkout-header'>
                        <div className='header-block'>
                            <span>Product</span>
                        </div>
                        <div className='header-block'>
                            <span>Description</span>
                        </div>
                        <div className='header-block'>
                            <span>Quantity</span>
                        </div>
                        <div className='header-block'>
                            <span>Price</span>
                        </div>
                        <div className='header-block'>
                            <span>Remove</span>
                        </div>
                    </div>
                    {cartItems.map((cartItem) => (
                        <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
                    ))}
                    <div className='total'>TOTAL: ${cartTotal}</div>

                    <Link to="/payment">
                        <PaymentButton buttonType={BUTTON_TYPES_CLASSES.inverted}>Checkout</PaymentButton>
                    </Link>
                </div>
                :

                <div style={{
                    width: '700px', height: "700px", position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                }}>
                    {View}
                </div>
            }
        </>


    );
};

export default Checkout;
