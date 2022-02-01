import React, { useState, useEffect } from 'react';
import MultiSelect from './MultiSelect.jsx';
import DatePicker from './ProposalDatePicker.jsx';



export default function ProposalForm(props) {
  const [headline, setHeadline] = useState(props.currProposal.headline)
  const [overview, setOverview] = useState(props.currProposal.overview)
  const [skills, setSkills] = useState(props.currProposal.skills)
  const [start, setStart] = useState(props.currProposal.start)
  const [end, setEnd] = useState(props.currProposal.end)
  const [location, setLocation] = useState(props.currProposal.location)
  const [budget, setBudget] = useState(props.currProposal.budget)
  const [timezone, setTimezone] = useState(props.currProposal.timezone)

  useEffect(() => {
    setHeadline(props.currProposal.headline)
    setOverview(props.currProposal.overview)
    setSkills(props.currProposal.skills)
    setStart(props.currProposal.start)
    setEnd(props.currProposal.end)
    setLocation(props.currProposal.location)
    setTimezone(props.currProposal.timezone)
    setBudget(props.currProposal.budget)
  }, [props.currProposal])

  const handleChange = (type, value) => {
    const typeToSetState = {
      'headline' : setHeadline,
      'overview' : setOverview,
      'skills' : setSkills,
      'start' : setStart,
      'end' : setEnd,
      'location' : setLocation,
      'budget' : setBudget,
      'timezone': setTimezone
    }
    typeToSetState[type](value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (props.currProposal.id === 'New') {
      props.addProposal({
        id: props.currProposal.id,
        headline,
        overview,
        skills,
        start,
        end,
        location,
        timezone,
        budget
      })
    } else {
      props.updateProposal({
        id: props.currProposal.id,
        headline,
        overview,
        skills,
        start,
        end,
        location,
        timezone,
        budget
      })
    }
  }


  return (
    <div class="col-span-3 px-4">
        <div class="text-center text-4xl py-6 font-bold">
          <p>{props.currProposal.id === "New" ? "New Proposal" : props.currProposal.headline}</p>
        </div>
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="headline">
            Headline
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="headline" type="text" placeholder="Headline" value={headline} onChange={(e) => handleChange('headline', e.target.value)}/>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="overview">
            Project Overview
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline break-words" id="overview" type="text" placeholder="Project Overview" value={overview} onChange={(e) => handleChange('overview', e.target.value)} />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="overview">
            Skills Required
          </label>
          <MultiSelect  type="skills" id={props.currProposal.id} selected={props.currProposal.skills} handleChange={handleChange}/>
        </div>

        <div class="mb-4">
          <div class="flex flex-row items-center">
            <div class="pr-10">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="timeline">
                Estimated Start Date
              </label>
              <div>
                <DatePicker id={props.currProposal.id} date={start} handleChange={(value) => handleChange('start', value)} />
              </div>
            </div>
            <div class="pr-10">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="timeline">
                Estimated End Date
              </label>
              <div>
                <DatePicker id={props.currProposal.id} date={end} handleChange={(value) => handleChange('end', value)} />
              </div>
            </div>
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="location">
            Location Preference
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="location" type="text" placeholder="Ex. San Francisco, CA" value={location} onChange={(e) => handleChange('location', e.target.value)} />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="location">
            Timezone Preference
          </label>
          <MultiSelect  type="timezone" id={props.currProposal.id} selected={props.currProposal.timezone} handleChange={handleChange}/>
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="budget">
            Budget
          </label>
          <div class="relative flex w-full flex-wrap items-stretch mb-3">
            <span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <input type="text" placeholder="Placeholder" class="px-3 py-1.5 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-md border border-blueGray-300 outline-none focus:outline-none focus:ring w-full pl-10" id="budget" placeholder="Ex. 1000" value={budget} onChange={(e) => handleChange('budget', e.target.value)}/>
          </div>
        </div>

        <div class="flex items-end">
          <button class="transition ease-in-out delay-50 bg-transparent border border-green text-green hover:bg-green hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" onClick={handleSubmit}>
            {props.currProposal.id === "New" ? "Publish" : "Update"}
          </button>
        </div>
      </form>
    </div>
  )
}