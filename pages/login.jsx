import Link from 'next/link';
import React, { useState } from 'react';

export default function LogIn() {

  const [userValidation, setUserValidation] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements["email"].value;
    const password = e.target.elements["password"].value;

    const database = [['nat', '1234'],['jesse','1234'],['chun', '1234'],['eric', '1234'], ['brian', '1234'], ['van', '1234']].map(el => JSON.stringify(el))

    if(database.includes(JSON.stringify([email, password]))) {
      window.open(`/${email}`,'_self') // add database here
      window.history.pushState({}, null, 'hey');
    }

    else {
      setUserValidation(false);
    }
    e.target.elements["email"].value = "";
    e.target.elements["password"].value = "";
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
          <div className="px-12 pb-10">
              <div className="w-full mb-2">
                  <div className="flex items-center">
                      <i className='ml-3 fill-current text-gray-400 text-xs z-10 fas fa-user'></i>
                      <input type='text' placeholder="email"
                          className="-mx-6 px-8  w-full border rounded px-3 py-2 text-gray-700 focus:outline-none" name="email" autoComplete="off"/>
                  </div>
              </div>
          </div>
              <div className="w-full mb-2">
                  <div className="flex items-center">
                      <i className='ml-3 fill-current text-gray-400 text-xs z-10 fas fa-lock'></i>
                      <input type='text' placeholder="Password"
                          className="-mx-6 px-8 w-full border rounded px-3 py-2 text-gray-700 focus:outline-none" name="password" autoComplete="off" />
                  </div>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <a href="#" className="text-xs text-green-500 float-right mb-4">Sign Up</a>
                <a href="#" className="text-xs text-gray-500 float-right mb-4">Forgot Password?</a>
              </div>
              <button type="submit"
                  className="w-full py-2 rounded-full bg-green-600 text-gray-100  focus:outline-none">Button</button>
      </form>
   </div>
  )
}