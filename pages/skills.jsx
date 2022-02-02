import SkillsForm from '../components/SkillsForm.jsx'
import Navbar from '../components/Navbar.jsx'
import React, { useState, useEffect } from 'react'

const fakeProfile = {
  _id: 1,
  firstName: "Jesse",
  lastName: "Huang",
  email: "jayjay@hireup.com",
  freelancer: {
      pm: true,
      designer: false,
      engineer: true
  },
  rate: {
      "$numberDecimal": "95.5" /// change. Why an object
  },
  work_history: "Senior project manager for Atlantic Web Development Agency",
  skills: ["React", "Full Stack Engineer"],
  education: "Hack Reactor",
  location: "HRSF2",
  portfolio: ["https://youtu.be/qwAKZBMkQgw"],
  proposals: [{
      headline: " Project Sushi-Ya",
      overview: "Irashaimase! I'm an experienced engineer looking to create the world's most efficient salmon nigiri creation algorithm.",
      timeline: {
          start: 1643514146,
          end: 1675050146
      },
      location: "Huntington Beach, CA ",
      timezones: ["pacific", "mountain"]  // need separate timezone for skill for hire
  }],
  profile_pic: "https://i.ibb.co/p0fyr4S/jesse.png",
  timezones: ["Pacific", "Mountain"]
}

export default function Proposal() {
  const [currProfile, setCurrentProfile] = useState(fakeProfile)


  return (
    <div class="grid grid-cols-5 gap-4">
      <div class="col-span-5 text-center"><Navbar /></div>
      <div class="row-span-3">
      </div>
      <div class="col-span-3">
        <SkillsForm profile={currProfile} />
      </div>
    </div>
  )
}