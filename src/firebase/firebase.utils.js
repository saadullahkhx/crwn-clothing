import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyB3-C2gQwyml2C9MqgShnfJMUrgcIRIrxI",
    authDomain: "crwn-db-71d36.firebaseapp.com",
    databaseURL: "https://crwn-db-71d36.firebaseio.com",
    projectId: "crwn-db-71d36",
    storageBucket: "crwn-db-71d36.appspot.com",
    messagingSenderId: "926487484724",
    appId: "1:926487484724:web:ad9c66ee65badcf31ded61",
    measurementId: "G-1FBYJE8DBQ"
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(e) {
            console.log(e.message);
        }
    }
    return userRef;
}


export default firebase;