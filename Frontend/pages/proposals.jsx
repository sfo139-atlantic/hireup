import axios from 'axios';
import Router from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import { auth, logout } from "../src/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useState, useEffect } from 'react';

import Navbar from '../components/Navbar.jsx';
import Loading from '../components/Loading.jsx';
import Sidebar from '../components/ProposalSidebar.jsx';
import ProposalForm from '../components/ProposalForm.jsx';


// checks for user login before showing the proposal page or re-route users to the login page
export default function ProposalCheckLogin() {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (!loading && !user) {
      return Router.push('/login');
    }
  }, [user, loading]);

  if (loading) {
    return <Loading/>;
  }

  if (user) {
    return <Proposal user={user} />;
  }
};



// Parent component to all related to proposals
// manages all the proposals related to the user and which proposal to show
const Proposal = ({ user }) => {
  const [allProposals, setAllProposal] = useState([]);
  const [currProposal, setCurrProposal] = useState(
    {
      id: "New",
      headline: "",
      overview: "",
      skills: [],
      timeline: {
        start: null,
        end: null
      },
      location: "",
      budget: "",
      timezone:[],
    }
  );

  useEffect(() => {
    axios.get(`http://localhost:3001/profiles/findOne?uid=${user.uid}`)
      .then((results) => {
        setAllProposal(results.data.proposals);
      })
      .catch((err) => {
        throw err
      })
  }, [user, allProposals, currProposal]);

  const switchToNew = () => (
    setCurrProposal(
      {
        id: "New",
        headline: "",
        overview: "",
        skills: [],
        timeline: {
          start: null,
          end: null
        },
        location: "",
        budget: "",
        timezone:[],
      }
    )
  );

  const switchProposal = (proposal) => {
    setCurrProposal(proposal);
  };

  const updateProposal = (proposal) => {
    proposal.start = new Date(proposal.start).getTime();
    proposal.end = new Date(proposal.end).getTime();
    proposal.userId = user.uid;

    axios.patch('http://localhost:3001/proposal', { proposal })
      .then(() => {
        axios.get(`http://localhost:3001/profiles/findOne?uid=${user.uid}`)
          .then(() => switchToNew());
      });
  };

  const addProposal = (proposal) => {
    proposal.id = uuidv4();

    if (!proposal.start) {
      proposal.start = new Date();
    }

    if (!proposal.end) {
      proposal.end = new Date();
    }

    proposal.start = proposal.start.getTime();
    proposal.end = proposal.end.getTime();
    proposal.userId = user.uid;

    axios.post('http://localhost:3001/proposal', { proposal })
      .then(() => {
        axios.get(`http://localhost:3001/profiles/findOne?uid=${user.uid}`)
          .then((results) => {
            setAllProposal(results.data.proposals);
            switchToNew();
          });
      });
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/proposal/delete/${user.uid}/${id}`)
      .then(() => {
        axios.get(`http://localhost:3001/profiles/findOne?uid=${user.uid}`)
          .then((results) => {
            setAllProposal(results.data.proposals);
            switchToNew();
          });
      });
  };

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
};

