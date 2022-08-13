import {useState} from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";
import './signin.styles.scss'

const defaultFromFields = {
    email: '',
    password: '',
}


const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFromFields)
    const {email, password} = formFields

    const resetFormFields = () => {
        setFormFields(defaultFromFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            await signInAuthUserWithEmailAndPassword(
                email,
                password
            );
            resetFormFields();
        } catch (e) {
            switch (e.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(e);
            }
        }

    }

    const signInWithGoogle = async () => {
       await signInWithGooglePopup()
    }

    const handleChange = (event) => {
        const {name, value} = event.target

        setFormFields({...formFields, [name]: value})
    }

    return (
        <>
            <div className='sign-up-container'>
                <h2>Already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={handleSubmit}>
                    <FormInput label="Email" required type="email" name="email" onChange={handleChange} value={email}/>

                    <FormInput label="Password" required type="password" name="password" onChange={handleChange}
                               value={password}/>

                    <div className="buttons-container">
                        <Button type="submit">Sign In</Button>
                        <Button type="button" onClick={signInWithGoogle} buttonType='google'>Google sign in</Button>
                    </div>

                </form>
            </div>
        </>
    )

}

export default SignInForm
