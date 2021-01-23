import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyArvApwC-klzelkXX-Mu__nZ0DUMGaBlWU",
    authDomain: "chat-4d92a.firebaseapp.com",
    databaseURL: "https://chat-4d92a-default-rtdb.firebaseio.com",
    projectId: "chat-4d92a",
    storageBucket: "chat-4d92a.appspot.com",
    messagingSenderId: "319751802728",
    appId: "1:319751802728:web:1a6c6f13245c10430390dd",
    measurementId: "G-NLVL9W1KVG"
};

firebase.initializeApp(firebaseConfig);

export default firebase;

export const auth = firebase.auth();
export const db = firebase.firestore()

export const loginWithEmail = async (email, password) => {
    const login = new firebase.auth().signInWithEmailAndPassword(email, password);
    try {
        return await login;
    } catch (error) {
        console.info(error.message)
        return error;
    }  
}

export const registerWithEmail = (email, password) => {
    const emailProvider = new firebase.auth().createUserWithEmailAndPassword(email, password);
    return emailProvider;
}

export const signInWithGoogle = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();
    try {
        await auth.signInWithPopup(googleProvider)
        window.location = '/';
    } catch (error) {
        console.info(error.message)
    }
}