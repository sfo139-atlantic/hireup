import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from 'firebase/firestore';

import { firebaseConfig } from '../config';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

/*-------------SignIn with Gmail------------- */
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const { user } = res;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        authProvider: 'google',
        email: user.email,
      })
    }
  } catch (err) {
    throw err
  }
};


/*-------------SignIn with Email------------- */
const logInWithEmailAndPassword = async (email, password, callback) => {
  try {
    const data = await signInWithEmailAndPassword(auth, email, password)
    callback(data, null)
  } catch (error) {
    callback(null, error.code);
  }
};


//*-------------Sign Up------------- */
const registerWithEmailAndPassword = async (email, password, callback) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      authProvider: "local",
      email,
    })
  } catch (error) {
    if(error.code === 'auth/email-already-in-use') {
      callback('Email has already been used')
    }
  }
};

/*------------- Reset password ------------- */
const sendPasswordReset = async (email, callback) => {
  try {
    const reset = await sendPasswordResetEmail(auth, email);
    callback('Reset password link has been sent to your email!', null)
  } catch (err) {
    callback(null, err.code)
  }
};

/*------------- Logout ------------- */
const logout = () => {
  signOut(auth);
};


export {
  auth,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};