import SkillsForm from '../components/SkillsForm.jsx'
import Navbar from '../components/Navbar.jsx'
import React, { useState, useEffect } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../src/firebase";
import Router from 'next/router'
import axios from 'axios';



const Skills = ({ user }) => {
  user.uid = "aFtgeYWjjmRn9T9xW6XzH1uP4ci1"

  const [currProfile, setCurrentProfile] = useState({
    firstName: "",
    lastName: "",
    education: "",
    workHistory: "",
    rate: "",
    location: "",
    timezone: [],
    portfolio: [],
    skills: [],
  })

  useEffect(() => {
    axios.get(`http://localhost:3001/profiles/${user.uid}`)
      .then((results) => {
        setCurrentProfile(results.data[0])
      })
      .catch((err) => {
        throw err
      })
  }, []);

  const updateProfile = (skill) => {
    setCurrentProfile(skill)
    skill.userId = user.uid
    axios.patch('http://localhost:3001/skill', { skill })
  }


  return (
    <div class="grid grid-cols-5 gap-4">
      <div class="col-span-5 text-center"><Navbar /></div>
      <div class="row-span-3">
      </div>
      <div class="col-span-3">
        <SkillsForm profile={currProfile} updateProfile={updateProfile}/>
      </div>
    </div>
  )
}

export default function SkillsCheckLogin() {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (!loading && !user) {
      return Router.push('/login')
    }
  }, [user, loading])

  if (loading) {
    return (
      <div>Loading</div>
    )
  }

  if (user) {
    return <Skills user={user} />
  } else {
    return null
  }

}