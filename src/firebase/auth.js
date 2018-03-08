import {auth} from './firebase';
import * as firebase from 'firebase';


export const doSignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(provider)
}

export const doSignOut = () =>
    auth.signOut();