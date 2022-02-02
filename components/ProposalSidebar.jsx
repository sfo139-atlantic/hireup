import React, { useEffect } from "react";

export default function ProposalForm({ allProposals, currProposal, switchProposal }) {

  return (
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col h-screen">
      <div class="text-xl pt-5 pb-1 mb-4 font-bold border-b-2">All Proposals</div>
      {allProposals.map(proposal => (
        <div
          key={proposal.id}
          class={proposal.id === currProposal.id ? "text-white border-2 bg-green rounded-lg font-bold" : ""}
          onClick={() => switchProposal(proposal)}>
          <div class="pl-2">
            {proposal.headline}
          </div>
        </div>
      )
      )}
        <div
          onClick={() => switchProposal({id: "New", headline: "", overview: "", skills: "", timeline: "", location: "", budget: "", timezone:""})}
          class={currProposal.id === 'New' ? "text-white border-2 bg-green rounded-lg font-bold" : ""}
        >
          <div class="pl-2">
            Add New Proposal
          </div>
        </div>
    </div>
  )
}