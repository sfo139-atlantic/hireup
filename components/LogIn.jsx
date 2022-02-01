import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { auth, logInWithEmailAndPassword, signInWithGoogle, sendPasswordReset } from "../src/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/router'

const LogIn = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth); ///SHARE OVER APP
  const [userValidation, setUserValidation] = useState(true);
  const router = useRouter();


  if (user) console.log(user.uid)
  const handleSubmit = (e) => {

    e.preventDefault();
    logInWithEmailAndPassword(email, password, ((res, err) => {
      err ? console.log(err) : window.open('/profile', '_self')
    }))

  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form className="w-full md:w-1/3 bg-white rounded-lg" onSubmit={handleSubmit}>
          <div className="flex font-bold justify-center mt-6">
              <img className="h-20 w-20"
                  src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg"/>
          </div>
          <h2 className="text-3xl text-center text-gray-700 mb-4">LogIn Form</h2>
          {!userValidation && <h3 className = "text-xs text-center text-red-500 mb-4">user does not exist</h3>}
          <input
            type="email"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email" autoComplete = "off" required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password" autoComplete = "off" required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <a href="/signup" className="text-xs text-green-500 float-right mb-4">Join here</a>
            <p className="text-xs text-gray float-right mb-4" onClick={()=> window.open('/resetpassword')}>Forgot Password?</p>
          </div>
          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
          >Log In</button>

        <button className="w-full text-center py-3 rounded bg-black text-white hover:bg-green-dark focus:outline-none my-1" onClick={() => {
          signInWithGoogle().then(()=> window.open('/profile', '_self'))
          }}>
          Login with Google
        </button>
        </form>
   </div>
  )
}
export default LogIn;

