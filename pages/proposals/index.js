import ProposalForm from '../../components/ProposalForm.jsx'
import Sidebar from '../../components/ProposalSideBar.jsx'
import React, { useState, useEffect } from 'react'

const fakeProposals = [
  {
    id:1,
    headline: 'HireUp1',
    overview: 'Bridging the gap between business entrepreneurs and digital product development experts by connect clients and their business ideas to product development specialists through an online marketplace.',
    skills: ['React Native', 'Project Management'],
    timeline: '1/11/2021 - 1/11/2022',
    location: 'San Francisco, CA',
    budget: '100'
  },
  {
    id:2,
    headline: 'HireUp2',
    overview: 'Bridging the gap between business entrepreneurs and digital product development experts by connect clients and their business ideas to product development specialists through an online marketplace.',
    skills: ['UI Design', 'Project Management'],
    timeline: '1/11/2021 - 1/11/2022',
    location: 'Seatle, CA',
    budget: '100'
  },
  {
    id:3,
    headline: 'HireUp3',
    overview: 'Bridging the gap between business entrepreneurs and digital product development experts by connect clients and their business ideas to product development specialists through an online marketplace.',
    skills: ['React Native', 'Project Management'],
    timeline: '1/11/2021 - 1/11/2022',
    location: 'Davis, CA',
    budget: '100'
  },
]

export default function Proposal() {
  const [currProposal, setCurrProposal] = useState(fakeProposals[0])

  const switchProposal = (proposal) => {
    setCurrProposal(proposal)
  }

  const updateProposal = (proposal) => {
    for(let i = 0; i < fakeProposals.length; i++) {
      if (fakeProposals[i].id === proposal.id) {
        fakeProposals[i] = proposal
      }
    }
  }
  const addProposal = (proposal) => {
    console.log('adding proposal', proposal)
  }

  return (
    <div class="grid grid-cols-5 gap-4">
      <div class="col-span-5 bg-green-500 py-5 text-center"> nav</div>
      <div class="row-span-3">
        <Sidebar currProposal={currProposal} switchProposal={switchProposal} allProposals={fakeProposals} />
      </div>
      <div class="col-span-3">

        <ProposalForm currProposal={currProposal} updateProposal={updateProposal} addProposal={addProposal} />
      </div>
    </div>
  )
}

