import {initializeApp} from 'firebase/app'
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyA_xw7LQCB1cITNTZQS2M6KyPTb2tkCblg",
    authDomain: "crown-clothing-dcaa5.firebaseapp.com",
    projectId: "crown-clothing-dcaa5",
    storageBucket: "crown-clothing-dcaa5.appspot.com",
    messagingSenderId: "978467391642",
    appId: "1:978467391642:web:713bd0ab2fd9711b873723"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth
        const createdAt = new Date()

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        }catch(error){
            console.log(error.log)
        }
    }

    return userDocRef
}