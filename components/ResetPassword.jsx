import React, { useState, useEffect } from 'react';
import { sendPasswordReset } from '../src/firebase'

const ResetPassword = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements["email"].value;
    sendPasswordReset(email, ((res, err) => err ? console.log(err) : console.log(res)))
  }
  return (

    <div class="container mx-auto">
    <div class="flex justify-center items-center h-screen px-20">

      <div class="w-full xl:w-3/4 lg:w-11/12 flex">

        <div
          class="w-full h-100 bg-gray hidden lg:block lg:w-1/2 bg-cover bg-center rounded-l-lg
          bg-[url('https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8&w=1000&q=80')]"
        ></div>

        <div class="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
          <div class="px-8 mb-4 text-center">
            <h3 class="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
            <p class="mb-4 text-sm text-gray">
              We get it, stuff happens. Just enter your email address below and we'll send you a
              link to reset your password!
            </p>
          </div>
          <form class="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleSubmit}>
            <div class="mb-4">
              <label class="block mb-2 text-sm font-bold text-gray-700" for="email">
                Email
              </label>
              <input
                class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter Email Address..."
              />
            </div>
            <div class="mb-6 text-center">
              <button
                class="w-full px-4 py-2 font-bold text-white bg-green rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
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
  )
}

export default ResetPassword;