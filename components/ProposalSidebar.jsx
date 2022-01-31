import React, { useEffect } from "react";

export default function ProposalForm(props) {

  return (
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col h-screen">
      <div class="text-xl pt-5 pb-1 mb-4 font-bold border-b-2">All Proposals</div>
      {props.allProposals.map(proposal => (
        <div
          key={proposal.id}
          class={proposal.id === props.currProposal.id ? "text-green" : ""}
          onClick={() => props.switchProposal(proposal)}>
          {proposal.headline}
        </div>
      )
      )}
        <div
          onClick={() => props.switchProposal({id: "New", headline: "", overview: "", skills: "", timeline: "", location: "", budget: "", timezone:""})}
          class={props.currProposal.id === 'New' ? "text-green" : ""}
        >
          Add New Proposal
        </div>
    </div>
  )
}