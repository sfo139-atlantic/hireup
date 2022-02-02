import React, { useState, useEffect } from 'react'
import Navbar from './Navbar.jsx'
import Carousel from './Carousel.jsx'
import { auth, logout } from "../src/firebase";
import { useAuthState } from "react-firebase-hooks/auth";



const Profile = () => {
  const [user] = useAuthState(auth);
  const fakeData = {_id:1,firstName:"Jesse",lastName:"Huang",email:"jayjay@hireup.com",freelancer:{pm:true,designer:false,engineer:true},rate:{"$numberDecimal":"95.5"},work_history:"Senior project manager for Atlantic Web Development Agency",skills:"An experienced project manager and full stack engineer",education:"Hack Reactor",location:"HRSF2",portfolio:["https://source.unsplash.com/WLUHO9A_xik/1600x900", "https://source.unsplash.com/WLUHO9A_xik/1600x900", "https://source.unsplash.com/WLUHO9A_xik/1600x900"],proposals:[{headline:" Project Sushi-Ya",overview:"Irashaimase! I'm an experienced engineer looking to create the world's most efficient salmon nigiri creation algorithm.",timeline:{start:1643514146,end:1675050146},location:"Huntington Beach, CA ",timezones:["pacific","mountain"]}],profile_pic:"https://i.ibb.co/p0fyr4S/jesse.png"}
  return (
    <div class="grid grid-cols-5 gap-4">
      <div class="col-span-5 text-center"><Navbar /></div>
      <div class="col-span-3">
        <div class="px-5">
          <Carousel portfolio={fakeData.portfolio}/>
        </div>
        <div class="px-5">
          <h1>
            Description
          </h1>
          <p>
            {fakeData.skills}
          </p>
        </div>
      </div>
      <div class="row-span-3">
        Profile Pic
      </div>
    </div>
  )
}
export default Profile;