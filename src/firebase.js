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
const signInWithGoogle = async (callback) => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const { user } = res;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    docs.then(()=> callback(user, null))

    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        authProvider: 'google',
        email: user.email,
      })
    }
  } catch (err) {
    callback(null,err.message);
  }
};


/*-------------SignIn with Email------------- */
const logInWithEmailAndPassword = async (email, password, callback) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    .then(data => callback(data, null))
  } catch (error) {
    callback(null, error.code);
  }
};


//*-------------Sign Up------------- */
const registerWithEmailAndPassword = async (email, password, callback) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password).then(data => callback(data.user.uid, null))
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      authProvider: "local",
      email,
    })
  } catch (error) {
    if(error.code === 'auth/email-already-in-use') {
      callback(null, 'Email has already been used')
    }
  }
};

/*------------- Reset password ------------- */
const sendPasswordReset = async (email, callback) => {
  try {
    await sendPasswordResetEmail(auth, email).then(() => callback('Reset password link has been sent to your email!', null))
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
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};