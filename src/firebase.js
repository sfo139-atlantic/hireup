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
// import 'regenerator-runtime/runtime';
import { firebaseConfig } from '../config';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
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
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password, callback) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    .then(data => callback(data, null))
  } catch (error) {
    callback(null, error.code);
  }
};
const registerWithEmailAndPassword = async (email, password, callback) => {
  try {

    const res = await createUserWithEmailAndPassword(auth, email, password).then(data => callback(data.user.uid, null))
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      authProvider: "local",
      email,
    })

    // callback('created', null)

  } catch (error) {
    const errCode = error.code
    if(errCode === 'auth/email-already-in-use') {
      callback(null, 'Email is already in use')
    } else {
      console.log(errCode)
    }
  }
};


const sendPasswordReset = async (email, callback) => {
  try {
    await sendPasswordResetEmail(auth, email).then(() => callback('reset password link sent!', null))

  } catch (err) {
    callback(null, err.code)
  }
};

const logout = () => {
  signOut(auth);
};


export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordReset,
  logout,
};