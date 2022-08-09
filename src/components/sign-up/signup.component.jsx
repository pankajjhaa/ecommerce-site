import {useState} from "react";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './signup.styles.scss'
import Button from "../button/button.component";

const defaultFromFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}


const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFromFields)

    const {displayName, email, password, confirmPassword} = formFields

    const resetFormFields = () => {
        setFormFields(defaultFromFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (password !== confirmPassword) {
            alert("password does not match")
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password)

            await createUserDocumentFromAuth(user, {displayName})
            resetFormFields()

        } catch (e) {
            if (e.code === 'auth/email-already-in-use') {
                alert("Email already in use")
            } else {
                console.log(e.message)
            }

        }

    }

    const handleChange = (event) => {
        const {name, value} = event.target

        setFormFields({...formFields, [name]: value})
    }
    return (
        <>
            <div className='sign-up-container'>
                <h2>Don't have an account</h2>
                <span>Sign up with your email and password</span>
                <form onSubmit={handleSubmit}>
                    <FormInput label="Display Name" required type="text" name="displayName" onChange={handleChange}
                               value={displayName}/>
                    <FormInput label="Email" required type="email" name="email" onChange={handleChange} value={email}/>

                    <FormInput label="Password" required type="password" name="password" onChange={handleChange}
                               value={password}/>
                    <FormInput label="Confirm Password" required type="password" name="confirmPassword"
                               onChange={handleChange} value={confirmPassword}/>

                    <Button type="submit">Sign Up</Button>
                </form>
            </div>

        </>
    )

}

export default SignUpForm