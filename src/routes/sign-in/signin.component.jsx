import {
    createUserDocumentFromAuth,
    signInWithGoogleRedirect
} from '../../utils/firebase/firebase.utils'
import SignUpForm from "../../components/sign-up/signup.component";


const SignIn = () => {


    const logGoogleUser = async () => {
        const {user} = await signInWithGoogleRedirect()
        const userDocRef = await createUserDocumentFromAuth(user)
    }

    return (
        <>
            <SignUpForm/>
        </>
    )

}

export default SignIn
