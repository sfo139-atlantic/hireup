<<<<<<< HEAD
import Link from 'next/link';
import React, { useState } from 'react';
import LogIn from '../components/LogIn.jsx'
export default function LogInPage() {
  return <LogIn/>
}
=======
import React, { useEffect, useState } from "react";
import { auth, logInWithEmailAndPassword, signInWithGoogle, sendPasswordReset } from "../src/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/router'

const classes = {
  input:'block border border-grey-light w-full p-3 rounded mb-4',
  button:'w-full mb-2 text-lg text-center py-3 rounded bg-green text-white font-bold',
  link:'text-base float-right mb-4 font-bold cursor-pointer'
}

const LogIn = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user] = useAuthState(auth);
  const [alertPrompt, setAlert] = useState()

  useEffect(()=>{
  },[alertPrompt])

  const handleSubmit = (e) => {
    e.preventDefault();
    logInWithEmailAndPassword(email, password, ((res, err) => {
      if(err) {
        if(err === 'auth/wrong-password'){
          setAlert('The password is incorrect. Try again')
        }
        else if(err === 'auth/user-not-found'){
          setAlert('That HireUp account does not exist. Please enter a different account')
        }
        else if(err === 'auth/too-many-requests'){
          setAlert('Sorry! You have exceeded the maximum login. Please try again later!')
        }
      } else {
        window.open('/profile', '_self')
      }
    }))
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form className="w-full md:w-1/3 bg-white rounded-lg" onSubmit={handleSubmit}>
        <div className="flex font-bold justify-center mt-6">
            <img className="h-20 w-20"
                src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg"/>
        </div>

        <h2 className="text-3xl text-center text-gray-700 mb-4 font-bold">
          LogIn</h2>
        {alertPrompt && <h3 className = "text-xs text-center text-red mb-1">{alertPrompt}</h3>}

        <input
          type="email"
          className={classes.input}
          name="email"
          placeholder="Email" autoComplete = "off" required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />

        <input
          type="password"
          className={classes.input}
          name="password"
          placeholder="Password" autoComplete = "off" required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />

        <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
          <a href="/signup" className={`${classes.link} text-green`}>Sign Up</a>
          <p className={classes.link} onClick={()=> window.open('/resetpassword','_self')}>Forgot Password?</p>
        </div>

        <button
          type="submit"
          className={classes.button}
        >Login</button>

        <button className={`${classes.button} bg-black`} onClick={() => {
          signInWithGoogle((res, err) => {
            window.open('/profile', '_self')
          })
          }}>
          <span>Login with Google</span>
        </button>

      </form>
   </div>
  )
}
export default LogIn;
>>>>>>> main
