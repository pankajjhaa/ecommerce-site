import {createUserDocumentFromAuth, signInWithGooglePopup} from '../../utils/firebase/firebase.utils'


const SignIn = () => {

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup()
        const userDocRef =  await createUserDocumentFromAuth(user)
    }

    return (
        <>
            <button onClick={logGoogleUser}>Sign in with google</button>
        </>
    )

}

export default SignIn
