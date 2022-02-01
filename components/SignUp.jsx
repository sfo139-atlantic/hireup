import React, { useState, useEffect } from 'react';
import { auth, registerWithEmailAndPassword } from "../src/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const SignUp = () => {
  const [alert, setAlert] = useState(null);
  const [user, loading, error] = useAuthState(auth);
  const [currentuser, setCurrentUser] = useState()
  console.log(user)
  useEffect(()=> {

  },[alert])

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements["email"].value;
    const pass1 = e.target.elements["password"].value;
    const pass2 = e.target.elements["confirm_password"].value;
    if(pass1 === pass2 && pass1.length >= 6) {
      registerWithEmailAndPassword(email, pass1, ((res, err) => {
        err ? setAlert(err) : ((res)=>{
          window.open('/profile', '_self')//////////// CONTEXT NEED!
        })()
      }))

    } else if (pass1 === pass2) {
      setAlert('Password does not match')
    } else if ([pass1, pass2].some(el => el.length < 6)) {
      setAlert('Password should be at least 6 characters')
    }
  }


  return (
    <form className="bg-grey-lighter min-h-screen flex flex-col" onSubmit={handleSubmit}>
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign Up</h1>
                    {
                      alert &&
                      <div class="bg-grey border-t border-b border-white text-white mb-2 px-1 py-1 rounded" role="alert">
                        <p class="font-bold">{alert}</p>
                        {/* <p class="text-sm px-2">- Password</p> */}
                      </div>
                    }

                    <input
                        type="email"
                        className="block border border-grey-light w-full p-3 rounded mb-4 Class
                        Properties
                        outline-none"
                        name="email"
                        placeholder="Email" autoComplete = "off"  required/>

                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4 outline-none"
                        name="password"
                        placeholder="Password" autoComplete = "off" required/>
                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4  outline-none"
                        name="confirm_password"
                        placeholder="Confirm Password" autoComplete = "off" required />

                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
                    >Join</button>
                </div>

                <div className="text-grey-dark mt-6">
                    Already have an account?
                    <a className="no-underline border-b border-blue text-blue" href="/login">
                        Login here!
                    </a>
                </div>
            </div>
        </form>
  )
}

export default SignUp;