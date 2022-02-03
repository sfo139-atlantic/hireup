
import axios from 'axios';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../src/firebase";
import Router from 'next/router'
import { v4 as uuidv4 } from 'uuid';


import ProposalForm from '../components/ProposalForm.jsx'
import Sidebar from '../components/ProposalSideBar.jsx'
import Navbar from '../components/Navbar.jsx'
import React, { useState, useEffect } from 'react'

const fakeProposals = [
  {
    id:1,
    headline: 'HireUp1',
    overview: 'Bridging the gap between business entrepreneurs and digital product development experts by connect clients and their business ideas to product development specialists through an online marketplace.',
    skills: ['React Native', 'Project Management'],
    start: 1603596550705,
    end: 1643596550705,
    location: 'San Francisco, CA',
    timezone: ['Pacific'],
    budget: '100'
  },
  {
    id:2,
    headline: 'HireUp2',
    overview: 'Bridging the gap between business entrepreneurs and digital product development experts by connect clients and their business ideas to product development specialists through an online marketplace.',
    skills: ['UI Design', 'Project Management'],
    start: 1643596550705,
    end: 1643596550705,
    location: 'Seatle, CA',
    timezone: ['Pacific'],
    budget: '100'
  },
  {
    id:3,
    headline: 'HireUp3',
    overview: 'Bridging the gap between business entrepreneurs and digital product development experts by connect clients and their business ideas to product development specialists through an online marketplace.',
    skills: ['React Native', 'Project Management'],
    start: 1643596550705,
    end: 1643596550705,
    location: 'Davis, CA',
    timezone: ['Pacific'],
    budget: '100'
  },
]


const Proposal = ({ user }) => {
  user.uid = "ozrPwHybIkP8zDw3VLEdOWUpGnK2"
  const [allProposals, setAllProposal] = useState(fakeProposals)
  const [currProposal, setCurrProposal] = useState({id: "New", headline: "", overview: "", skills: [], timeline: { start: null, end: null}, location: "", budget: "", timezone:[]})

  useEffect(() => {
    axios.get(`http://localhost:3001/profiles/${user.uid}`) //switch to user.uid
      .then((results) => {
        setAllProposal(results.data[0].proposals)
      })
      .catch((err) => {
        throw err
      })
  }, []);

  const switchProposal = (proposal) => {
    setCurrProposal(proposal)
  }

  const updateProposal = (proposal) => {
    proposal.start = new Date(proposal.start).getTime()
    proposal.end = new Date(proposal.end).getTime()
    proposal.userId = user.uid

    axios.patch('http://localhost:3001/proposal', { proposal })
      .then(() => {
        axios.get(`http://localhost:3001/profiles/${user.uid}`) //switch to user.uid
          .then((results) => {
            setAllProposal(results.data[0].proposals)
          })
      })
  }

  const addProposal = (proposal) => {
    if (proposal.id === 'New') {
      proposal.id = uuidv4();
    }

    if (!proposal.start) {
      proposal.start = new Date();
    }

    if (!proposal.end) {
      proposal.end = new Date();
    }

    proposal.start = proposal.start.getTime()
    proposal.end = proposal.end.getTime()
    proposal.userId = user.uid

    axios.post('http://localhost:3001/proposal', { proposal })
      .then(() => {
        axios.get(`http://localhost:3001/profiles/${user.uid}`) //switch to user.uid
          .then((results) => {
            setAllProposal(results.data[0].proposals)
          })
      })
  }

  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="col-span-5 text-center"><Navbar /></div>
      <div className="row-span-3">
        <Sidebar currProposal={currProposal} switchProposal={switchProposal} allProposals={allProposals} />
      </div>
      <div className="col-span-3">

        <ProposalForm currProposal={currProposal} updateProposal={updateProposal} addProposal={addProposal} />
      </div>
    </div>
  )
}

export default function ProposalCheckLogin() {
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
    return <Proposal user={user} />
  } else {
    return null
  }

}