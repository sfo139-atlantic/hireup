import React, { useState, useEffect } from 'react';
import { sendPasswordReset } from '../src/firebase'
import Navbar from '../components/Navbar.jsx';
import { useRouter } from 'next/router';

const ResetPassword = () => {
  const [alertPrompt, setAlert] = useState();
  const router = useRouter();

  useEffect(()=>{
  },[alertPrompt])
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements["email"];

    sendPasswordReset(email.value, ((res, err) => err ? setAlert('No account associated with this email address') : ((res)=>{
      setAlert('sent');
      router.push('/redirecttologin')
    })()))
  }
  return (
    <>
      <Navbar/>
      <div className="container mx-auto ">
      <div className="flex justify-center items-center h-screen px-20">

        <div className="w-full xl:w-3/4 lg:w-11/12 flex shadow-md p-2 rounded-l-lg ">

          <div
            className="w-full h-100 bg-gray hidden lg:block lg:w-1/2 bg-cover bg-center rounded-l-lg
            bg-[url('https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8&w=1000&q=80')]"
          ></div>

          <div className="w-full lg:w-1/2 p-5 rounded-lg">
            <div className="px-8 mb-4 text-center">
              <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
              <p className="mb-4 text-sm">
                We get it, stuff happens. Just enter your email address below and we'll send you a
                link to reset your password!
              </p>

            </div>
            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleSubmit}>
              <div className="mb-4">

                {  alertPrompt === 'sent'
                    ? <h2 className='font-bold text-sm text-center'>Reset password link has been sent!
                    <span className='text-green ml-4'>&#10003;</span></h2>
                    :
                    <>
                      <p className="block mb-1 text-sm font-bold">
                        Email
                      </p>
                      <p className='text-xs text-red font-normal text-bold'>{alertPrompt && alertPrompt !== 'sent' && alertPrompt}</p>
                      <input
                        className="w-full px-3 py-2 text-sm border rounded outline-none "
                        id="email"
                        type="email"
                        autoComplete = "off"
                        placeholder="Enter Email Address..."
                        required
                      />
                    </>
                }

              </div>
              <div className="mb-6 text-center">
                <button
                  className="w-full px-4 py-2 font-bold text-white bg-green rounded-full"
                  type="submit"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default ResetPassword;