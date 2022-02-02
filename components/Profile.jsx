import React, { useState, useEffect } from 'react'
import Navbar from './Navbar.jsx'
// import Carousel from './Carousel.jsx'
import { auth, logout } from "../src/firebase";
import { useAuthState } from "react-firebase-hooks/auth";



const Profile = () => {
  const [user] =useAuthState(auth);

  const fakeData = {
    _id:1,
    firstName:"Jesse",
    lastName:"Huang",
    email:"jayjay@hireup.com",
    freelancer:{pm:true,designer:false,engineer:true},
    rate:{"$numberDecimal":"95.5"},
    work_history:"Senior project manager for Atlantic Web Development Agency",
    skills:"An experienced project manager and full stack engineer",education:"Hack Reactor",
    location:"HRSF2",
    portfolio:["https://source.unsplash.com/WLUHO9A_xik/1600x900", "https://source.unsplash.com/WLUHO9A_xik/1600x900", "https://source.unsplash.com/WLUHO9A_xik/1600x900"],
    proposals:[
      {headline:" Project Sushi-Ya",
    overview:"Irashaimase! I'm an experienced engineer looking to create the world's most efficient salmon nigiri creation algorithm.",
    timeline:{start:1643514146, end:1675050146},
    location:"Huntington Beach, CA ",
    timezones:["pacific","mountain"]}],
    profile_pic:"https://i.ibb.co/p0fyr4S/jesse.png"
  }

  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="col-span-5 text-center"><Navbar /></div>
      <div className="col-span-3">
        <div className="px-5">
          {/* <Carousel portfolio={fakeData.portfolio}/> */}
        </div>
        <div className="px-5">
          <h1 className='my-2'>
            Educations:
          </h1>
          <p className='my-2'>
            {fakeData.education}
          </p>
          <h1 className='my-2'>
            Description:
          </h1>
          <p className='my-2'>
            {fakeData.skills}
          </p>
          <h1 className='my-2'>
            Work History:
          </h1>
          <p className='my-2'>
            {fakeData.work_history}
          </p>
        </div>
      </div>
      <div className="felx flex-col justify-center">
        <div>
          <img className='shrink-0 grow-0 rounded-full' src={typeof fakeData.profile_pic === 'string' ? fakeData.profile_pic : "profile_placeholder_lightbg.jpeg"}></img>
        </div>
        <div className='text-center my-2'>
          Name: {`${fakeData.firstName} ${fakeData.lastName}`}
        </div>
        <div className='text-center my-2'>
          Hourlysdjfsjfsj: ${fakeData.rate.$numberDecimal}
        </div>
        <div className='flex justify-center'>
          <button className="transition ease-in-out delay-50 bg-transparent border border-green text-green hover:bg-green hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2">Contact</button>
        </div>
      </div>
    </div>
  )
}
export default Profile;