import orderSuccessLottie from "../../assets/lottie/order_success.json";
import {useLottie} from 'lottie-react';
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const OrderSuccess = () => {
    const navigation = useNavigate()

    const options = {
        animationData: orderSuccessLottie,
        loop: true,
        width: "50%"
    };

    const {View} = useLottie(options);

    useEffect(() => {
        setTimeout(() => {
            navigation('/')
        }, 5000)
    }, [])
    return (
        <>
            <div style={{
                width: '700px', height: "700px", position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
            }}>
                {View}
            </div>
        </>
    )
}

export default OrderSuccess
