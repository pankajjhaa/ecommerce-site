
import SignUpForm from "../../components/sign-up/signup.component";
import SignInForm from "../../components/sign-in/signin.component";
import './authentication.styles.scss'

const Authentication = () => {
    return (
        <>
            <div className="authentication-container">
                <SignInForm />
                <SignUpForm/>
            </div>

        </>
    )

}

export default Authentication
