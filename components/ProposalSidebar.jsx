import React from "react";

export default function ProposalForm(props) {

  return (
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col h-screen">
      <div class="text-xl py-8">All Proposals</div>
      {props.allProposals.map(proposal => proposal.id === props.currProposal.id ?
        <div
          key={proposal.id}
          class="text-green-400"
          onClick={() => props.switchProposal(proposal)}>
          {proposal.headline}
        </div> :
        <div
          key={proposal.id}
          onClick={() => props.switchProposal(proposal)}>
          {proposal.headline}
        </div>)}
        <div
          onClick={() => props.switchProposal({id: "New", headline: "", overview: "", skills: "", timeline: "", location: "", budget: ""})}
          class={props.currProposal.id === 'New' ? "text-green-400" : ""}
        >
          Add New Proposal
        </div>
    </div>
  )
}