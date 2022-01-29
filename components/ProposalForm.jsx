import React, { useState, useEffect } from 'react';

export default function ProposalForm(props) {
  const [headline, setHeadline] = useState(props.currProposal.headline)
  const [overview, setOverview] = useState(props.currProposal.overview)
  const [skills, setSkills] = useState(props.currProposal.skills)
  const [timeline, setTimeline] = useState(props.currProposal.timeline)
  const [location, setLocation] = useState(props.currProposal.location)
  const [budget, setBudget] = useState(props.currProposal.budget)

  useEffect(() => {
    setHeadline(props.currProposal.headline)
    setOverview(props.currProposal.overview)
    setSkills(props.currProposal.skills)
    setTimeline(props.currProposal.timeline)
    setLocation(props.currProposal.location)
    setBudget(props.currProposal.budget)
  }, [props.currProposal])

  const handleChange = (e) => {
    const idToSetState = {
      'headline' : setHeadline,
      'overview' : setOverview,
      'skills' : setSkills,
      'timeline' : setTimeline,
      'location' : setLocation,
      'budget' : setBudget
    }
    idToSetState[e.target.id](e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (props.currProposal.id === 'New') {
      props.addProposal({
        id: props.currProposal.id,
        headline,
        overview,
        skills,
        timeline,
        location,
        budget
      })
    } else {
      props.updateProposal({
        id: props.currProposal.id,
        headline,
        overview,
        skills,
        timeline,
        location,
        budget
      })
    }
  }

  return (
    <div class="col-span-3 px-4">
        <div class="text-center text-4xl py-6">
          <p>{props.currProposal.id === "New" ? "New Proposal" : props.currProposal.headline}</p>
        </div>
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="headline">
            Headline
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="headline" type="text" placeholder="Headline" value={headline} onChange={handleChange}/>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="overview">
            Project Overview
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline break-words" id="overview" type="text" placeholder="Project Overview" value={overview} onChange={handleChange} />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="skills">
            Skills Required
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="skills" type="text" placeholder="Skills Required" value={skills} onChange={handleChange} />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="timeline">
            Estimated Timeline
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="timeline" type="text" placeholder="Estimated Timeline" value={timeline} onChange={handleChange} />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="location">
            Location Preference
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="location" type="text" placeholder="Location Preference" value={location} onChange={handleChange} />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="budget">
            Budget
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="budget" type="text" placeholder="Budget" value={budget} onChange={handleChange} />
        </div>
        <div class="flex items-end">
          {/* <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" type="button">
            Update
          </button> */}
          <button class="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" onClick={handleSubmit}>
            {props.currProposal.id === "New" ? "Publish" : "Update"}
          </button>
        </div>
      </form>
    </div>
  )
}