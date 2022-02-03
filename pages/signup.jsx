import React, { useState, useEffect } from 'react';
import { auth, registerWithEmailAndPassword } from "../src/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const classes = {
  input:"block border border-grey-light w-full p-3 rounded mb-4 outline-none",
}

const SignUp = () => {
  const [alertPrompt, setAlert] = useState(null);
  const [user, loading, error] = useAuthState(auth);
  const [currentuser, setCurrentUser] = useState()

  useEffect(()=> {
  },[alertPrompt])

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements["email"].value;
    const pass1 = e.target.elements["password"].value;
    const pass2 = e.target.elements["confirm_password"].value;
    if(pass1 === pass2 && pass1.length >= 6) {
      registerWithEmailAndPassword(email, pass1, ((res, err) => {
        err ? setAlert(err) : ((res)=>{
          window.open('/profile', '_self')
        })()
      }))
    } else if ([pass1, pass2].some(el => el.length < 6)) {
      setAlert('Password should be at least 6 characters')
    } else if (pass1 !== pass2) {
      setAlert('Password does not match')
    }
  }

  return (
    <form className="min-h-screen flex flex-col" onSubmit={handleSubmit}>
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md w-full">
          <h1 className="mb-8 text-3xl text-center font-extrabold">Sign Up</h1>
          
          {
            alertPrompt &&
            <div className=" text-red text-xs text-center mb-2 px-1 py-1 rounded">
              <p className="font-bold">{alertPrompt}</p>
            </div>
          }

        <input
            type="email"
            className={classes.input}
            name="email"
            placeholder="Email" autoComplete = "off"  required/>

        <input
            type="password"
            className={classes.input}
            name="password"
            placeholder="Password" autoComplete = "off" required/>

        <input
            type="password"
            className={classes.input}
            name="confirm_password"
            placeholder="Confirm Password" autoComplete = "off" required />

        <button
            type="submit"
            className="w-full text-center py-3 rounded bg-green text-white  my-1"
        >Join</button>
        </div>

        <div className="mt-6 ">
            <span className='text-xs'> Already have an account?</span>
            <a className="ml-6 no-underline border-b font-bold text-xs" href="/login">
                Login here!
            </a>
        </div>
      </div>
    </form>
  )
}

export default SignUp;