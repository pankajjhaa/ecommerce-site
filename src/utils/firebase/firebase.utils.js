import {initializeApp} from 'firebase/app'
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from 'firebase/auth'
import {collection, doc, getDoc, getDocs, getFirestore, query, setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA_xw7LQCB1cITNTZQS2M6KyPTb2tkCblg",
    authDomain: "crown-clothing-dcaa5.firebaseapp.com",
    projectId: "crown-clothing-dcaa5",
    storageBucket: "crown-clothing-dcaa5.appspot.com",
    messagingSenderId: "978467391642",
    appId: "1:978467391642:web:713bd0ab2fd9711b873723"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()


export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories')
    const q = query(collectionRef)
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data())
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

    if (!userAuth) return

    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)

    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log(error.log)
        }
    }

    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

export const getCurrentUser =  () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
                reject
            )
    })
}
