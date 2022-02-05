import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../src/firebase";
import Router from 'next/router';
import axios from 'axios';

import Navbar from '../components/Navbar.jsx';
import Loading from '../components/Loading.jsx';
import SkillsForm from '../components/SkillsForm.jsx';

// checks for user login before showing the skills page or re-route users to the login page
export default function SkillsCheckLogin() {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (!loading && !user) {
      return Router.push('/login')
    }
  }, [user, loading]);

  if (loading) {
    return <Loading/>;
  }

  if (user) {
    return <Skills user={ user } />;
  }
};

// Parent component to all related to proposals
// manages all the proposals related to the user and which proposal to show
const Skills = ({ user }) => {
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
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/profiles/findOne?uid=${user.uid}`)
      .then((results) => {
        setCurrentProfile(results.data);
      })
      .catch((err) => {
        throw err;
      })
  }, []);

  const updateProfile = (skill) => {
    setCurrentProfile(skill);
    skill.userId = user.uid;
    axios.patch('http://localhost:3001/skill', { skill });
  };


  return (
    <div class="grid grid-cols-5 gap-4">
      <div class="col-span-5 text-center"><Navbar /></div>
      <div class="row-span-3">
      </div>
      <div class="col-span-3">
        <SkillsForm profile={currProfile} updateProfile={updateProfile}/>
      </div>
    </div>
  );
};