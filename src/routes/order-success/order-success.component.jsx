import orderSuccessLottie from "../../assets/lottie/order_success.json";
import Lottie from "react-lottie";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const OrderSuccess = () => {
    const navigation = useNavigate()
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: orderSuccessLottie,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    useEffect(() => {
        setTimeout(() => {
            navigation('/')
        }, 5000)
    }, [])
    return (
        <>
            <Lottie
                options={defaultOptions}
                height={700}
                width={700}
            />
        </>
    )
}

export default OrderSuccess
