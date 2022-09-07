import SignUpForm from "../../components/sign-up/signup.component";
import SignInForm from "../../components/sign-in/signin.component";
import './authentication.styles.scss'
import {useSelector} from "react-redux";
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {selectCurrentUser, selectUserError} from "../../store/user/user.selector";

const Authentication = () => {
    const currentUser = useSelector(selectCurrentUser)
    const navigate = useNavigate()
    useEffect(() => {
        if (currentUser) {
            navigate('/')
        }
    }, [])
    return (
        <>
            <div className="authentication-container">
                <SignInForm/>
                <SignUpForm/>
            </div>

        </>
    )

}

export default Authentication
