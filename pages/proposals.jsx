
import axios from 'axios';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../src/firebase";
import Router from 'next/router'
import { v4 as uuidv4 } from 'uuid';
import Loading from '../components/Loading.jsx';


import ProposalForm from '../components/ProposalForm.jsx'
import Sidebar from '../components/ProposalSidebar.jsx'
import Navbar from '../components/Navbar.jsx'
import React, { useState, useEffect } from 'react'


const Proposal = ({ user }) => {
  // user.uid = "Gt3XV1ftMNb9G3mpDpmnVl72QOD3"
  const [allProposals, setAllProposal] = useState([])
  const [currProposal, setCurrProposal] = useState({id: "New", headline: "", overview: "", skills: [], timeline: { start: null, end: null}, location: "", budget: "", timezone:[]})

  useEffect(() => {
    axios.get(`http://localhost:3001/profiles/?uid=${user.uid}`) //switch to user.uid
      .then((results) => {
        console.log(results.data)
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
        axios.get(`http://localhost:3001/profiles/?uid=${user.uid}`) //switch to user.uid
          .then((results) => {
            setAllProposal(results.data[0].proposals)
          })
      })
  }

  const addProposal = (proposal) => {
    proposal.id = uuidv4();

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
        axios.get(`http://localhost:3001/profiles/?uid=${user.uid}`)
          .then((results) => {
            setAllProposal(results.data[0].proposals)
          })
      })
  }

  const handleDelete = (e, id) => {
    e.preventDefault()
    console.log('delete', id)
    axios.put(`http://localhost:3001/proposal/delete/${user.uid}/${id}`)
      .then(() => {
        axios.get(`http://localhost:3001/profiles/?uid=${user.uid}`)
          .then((results) => {
            setAllProposal(results.data[0].proposals)
            setCurrProposal({id: "New", headline: "", overview: "", skills: [], timeline: { start: null, end: null}, location: "", budget: "", timezone:[]})
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

        <ProposalForm currProposal={currProposal} updateProposal={updateProposal} addProposal={addProposal} handleDelete={handleDelete} />
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
      <Loading/>
    )
  }

  if (user) {
    return <Proposal user={user} />
  } else {
    return null
  }

}