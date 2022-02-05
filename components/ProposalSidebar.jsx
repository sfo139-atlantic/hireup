import React, { useEffect } from "react";

export default function ProposalForm({ allProposals, currProposal, switchProposal }) {

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col h-screen">
      <div className="text-xl pt-5 pb-1 mb-4 font-bold border-b-2">All Proposals</div>
      {allProposals.map(proposal => {
        return (
        <div
          key={proposal.id}
          className={proposal._id === currProposal._id ? "text-white border-2 bg-green rounded-lg font-bold" : ""}
          onClick={() => switchProposal(proposal)}>
          <div className="pl-2">
            {proposal.headline}
          </div>
        </div>
        );
      }
      )}
        <div
          onClick={() => switchProposal({id: "New", headline: "", overview: "", skills: "", timeline: "", location: "", budget: "", timezone:""})}
          className={currProposal.id === 'New' ? "text-white border-2 bg-green rounded-lg font-bold" : ""}
        >
          <div className="pl-2">
            Add New Proposal
          </div>
        </div>
    </div>
  )
}