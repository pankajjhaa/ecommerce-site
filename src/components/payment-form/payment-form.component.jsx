import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js'

import {BUTTON_TYPES_CLASSES} from '../button/button.component'
import {FormContainer, PaymentButton, PaymentFormContainer} from "./payment-form.styles";
import {useDispatch, useSelector} from "react-redux";
import {selectCartTotal} from "../../store/cart/cart.selector";
import {selectCurrentUser} from "../../store/user/user.selector";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {removeAllItemsFromCart} from "../../store/cart/cart.action";


const PaymentForm = () => {

    const stripe = useStripe()
    const elements = useElements()
    const amount = useSelector(selectCartTotal)
    const currentUser = useSelector(selectCurrentUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isProcessingPayment, setIsProcessingPayment] = useState(false)
    const paymentHandler = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return
        }

        setIsProcessingPayment(true)

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({amount: amount * 100})
        }).then(res => res.json());

        const {paymentIntent: {client_secret}} = response


        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser?.display_name : 'Pankaj jha',
                }
            }
        })

        setIsProcessingPayment(false)

        if (paymentResult.error) {

            alert(paymentResult.error.message)
        } else {
            dispatch(removeAllItemsFromCart())
            if (paymentResult.paymentIntent.status === "succeeded") {
                navigate('/order-success')
            }
        }

    }

    return (
        <>
            <PaymentFormContainer>
                <FormContainer onSubmit={paymentHandler}>
                    <h2>Payment</h2>
                    <p>Test card details: 4242 4242 4242 4242</p>
                    <CardElement/>
                    <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPES_CLASSES.inverted}>
                        Pay now
                    </PaymentButton>
                </FormContainer>
            </PaymentFormContainer>

        </>

    )
}

export default PaymentForm
