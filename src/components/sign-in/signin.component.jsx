import {useState} from "react";
import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPES_CLASSES} from "../button/button.component";

import './signin.styles.scss'
import {useDispatch, useSelector} from "react-redux";
import {emailSignInStart, googleSignInStart} from "../../store/user/user.action";
import {selectCurrentUser, selectUserError} from "../../store/user/user.selector";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const defaultFromFields = {
    email: '',
    password: '',
}


const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFromFields)
    const {email, password} = formFields

    const navigate = useNavigate()
    const user = useSelector(selectCurrentUser)
    const userError = useSelector(selectUserError)
    const dispatch = useDispatch()
    const resetFormFields = () => {
        setFormFields(defaultFromFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            dispatch(emailSignInStart(email, password))
            if(!user){
                console.log("userError", userError)
                toast.error(userError.error.code)
                return
            }
            navigate('/')
            resetFormFields();

        } catch (e) {
            console.log('catch' ,e)
            // switch (e.code) {
            //     case 'auth/wrong-password':
            //         alert('incorrect password for email');
            //         break;
            //     case 'auth/user-not-found':
            //         alert('no user associated with this email');
            //         break;
            //     default:
            //         console.log(e);
            // }
        }

    }

    const signInWithGoogle = async () => {
      dispatch(googleSignInStart())
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
                        <Button type="button" onClick={signInWithGoogle} buttonType={BUTTON_TYPES_CLASSES.google}>Google sign in</Button>
                    </div>

                </form>
            </div>
        </>
    )

}

export default SignInForm
