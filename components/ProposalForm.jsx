import React, { useState, useEffect } from 'react';
import MultiSelect from './MultiSelect.jsx';
import DatePicker from './ProposalDatePicker.jsx';



export default function ProposalForm({ currProposal, addProposal, updateProposal }) {
  const [headline, setHeadline] = useState(currProposal.headline)
  const [overview, setOverview] = useState(currProposal.overview)
  const [skills, setSkills] = useState(currProposal.skills)
  const [start, setStart] = useState(currProposal.timeline.start)
  const [end, setEnd] = useState(currProposal.timeline.end)
  const [location, setLocation] = useState(currProposal.location)
  const [budget, setBudget] = useState(currProposal.budget)
  const [timezones, setTimezones] = useState(currProposal.timezones)


  useEffect(() => {
    setHeadline(currProposal.headline)
    setOverview(currProposal.overview)
    setSkills(currProposal.skills)
    setStart(currProposal.timeline.start)
    setEnd(currProposal.timeline.end)
    setLocation(currProposal.location)
    setTimezones(currProposal.timezones)
    setBudget(currProposal.budget)
  }, [currProposal])

  const handleChange = (type, value) => {
    const typeToSetState = {
      'headline' : setHeadline,
      'overview' : setOverview,
      'skills' : setSkills,
      'start' : setStart,
      'end' : setEnd,
      'location' : setLocation,
      'budget' : setBudget,
      'timezones': setTimezones
    }
    typeToSetState[type](value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (currProposal.id === 'New') {
      addProposal({
        id: currProposal.id,
        headline,
        overview,
        skills,
        start,
        end,
        location,
        timezones,
        budget
      })
    } else {
      updateProposal({
        id: currProposal._id,
        headline,
        overview,
        skills,
        start,
        end,
        location,
        timezones,
        budget
      })
    }
  }


  return (
    <div className="col-span-3 px-4">
        <div className="text-center text-4xl py-6 font-bold">
          <p>{currProposal.id === "New" ? "New Proposal" : currProposal.headline}</p>
        </div>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="headline">
            Headline
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="headline" type="text" placeholder="Headline" value={headline} onChange={(e) => handleChange('headline', e.target.value)}/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="overview">
            Project Overview
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline break-words" id="overview" type="text" placeholder="Project Overview" value={overview} onChange={(e) => handleChange('overview', e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="budget">
            Budget
          </label>
          <div className="relative flex w-full flex-wrap items-stretch mb-3">
            <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <input type="text" placeholder="Placeholder" className="px-3 py-1.5 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-md border border-blueGray-300 outline-none focus:outline-none focus:ring w-full pl-10" id="budget" placeholder="Ex. 1000" value={budget} onChange={(e) => handleChange('budget', e.target.value)}/>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="overview">
            Skills Required
          </label>
          <MultiSelect  type="skills" id={currProposal.id} selected={currProposal.skills} handleChange={handleChange}/>
        </div>

        <div className="mb-4">
          <div className="flex flex-row items-center">
            <div className="pr-10">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="timeline">
                Estimated Start Date
              </label>
              <div>
                <DatePicker id={currProposal.id} date={start} handleChange={(value) => handleChange('start', value)} />
              </div>
            </div>
            <div className="pr-10">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="timeline">
                Estimated End Date
              </label>
              <div>
                <DatePicker id={currProposal.id} date={end} handleChange={(value) => handleChange('end', value)} />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            Location Preference
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="location" type="text" placeholder="Ex. San Francisco, CA" value={location} onChange={(e) => handleChange('location', e.target.value)} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            Timezone Preference
          </label>
          <MultiSelect  type="timezones" id={currProposal.id} selected={currProposal.timezones} handleChange={handleChange}/>
        </div>

        <div className="flex items-end">
          <button className="transition ease-in-out delay-50 bg-transparent border border-green text-green hover:bg-green hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" onClick={handleSubmit}>
            {currProposal.id === "New" ? "Publish" : "Update"}
          </button>
        </div>
      </form>
    </div>
  )
}