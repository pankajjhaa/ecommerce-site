import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss';
import {useSelector} from "react-redux";
import {selectCartItems, selectCartTotal} from "../../store/cart/cart.selector";
import Lottie from 'react-lottie';
import emptyCartLottie from '../../assets/lottie/empty-cart.json';
import {Link} from "react-router-dom";
import {PaymentButton} from "../../components/payment-form/payment-form.styles";
import {BUTTON_TYPES_CLASSES} from "../../components/button/button.component";

const Checkout = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: emptyCartLottie,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    const cartItems = useSelector(selectCartItems)
    const cartTotal = useSelector(selectCartTotal)
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
                <Lottie
                    options={defaultOptions}
                    height={700}
                    width={700}
                />
            }
        </>


    );
};

export default Checkout;
