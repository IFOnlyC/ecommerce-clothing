// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  //   signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDuNgOlBHvAV511Nazt-FWSZ5-L8_lkKNc',
  authDomain: 'henry-clothing-db.firebaseapp.com',
  projectId: 'henry-clothing-db',
  storageBucket: 'henry-clothing-db.appspot.com',
  messagingSenderId: '723833428419',
  appId: '1:723833428419:web:ed1ccd77dd9972840cc576',
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// ************ Redirect Sign In ************
// export const signInWithGoogleRedirect = () =>
//   signInWithRedirect(auth, googleProvider);

// create db
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth) return;

  // get the reference of the document model instance
  const userDocRef = doc(db, 'users', userAuth.uid);

  // get user data/object
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { userName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { userName, email, createdAt });
    } catch (error) {
      console.log('An Error happened when creating the user: ', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutAuthUser = async () => await signOut(auth);

/** Listener pattern
 *
 * {
 *    next: callback,
 *    error: errorCallback,
 *    complete: completeCallback
 * }
 *
 */
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
