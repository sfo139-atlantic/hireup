import React, { useState, useEffect } from 'react';
import MultiSelect from './MultiSelect.jsx';


export default function ProposalForm(props) {
  const [firstName, setFirstName] = useState(props.profile.firstName);
  const [lastName, setLastName] = useState(props.profile.lastName);
  const [portfolio, setPortfolio] = useState(props.profile.portfolio);
  const [education, setEducation] = useState(props.profile.education);
  const [workHistory, setWorkHistory] = useState(props.profile.work_history);
  const [skills, setSkills] = useState(props.profile.skills);
  const [rate, setRate] = useState(props.profile.rate["$numberDecimal"]);
  const [location, setLocation] = useState(props.profile.location);
  const [timezones, setTimezones] = useState(props.profile.timezones);

  const handleChange = (type, value) => {
    const typeToSetState = {
      'firstName' : setFirstName,
      'lastName' : setLastName,
      'education' : setEducation,
      'workHistory' : setWorkHistory,
      'rate' : setRate,
      'timezone' : setTimezones,
      'portfolio' : setPortfolio,
      'skills' : setSkills,
    }
    typeToSetState[type](value)
  }

  return (
    <div class="col-span-3 px-4">
        <div class="text-center text-4xl py-6 font-bold">
          <p>Skills</p>
        </div>
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="firstName">
            First Name
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" placeholder="First Name" value={firstName} onChange={(e) => handleChange('firstName', e.target.value)}/>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="lastName">
            Last Name
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" placeholder="Last Name" value={lastName} onChange={(e) => handleChange('lastName', e.target.value)}/>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="education">
            Education
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" placeholder="Education" value={education} onChange={(e) => handleChange('education', e.target.value)}/>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="work_history">
            Work History
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="work_history" type="text" placeholder="Work History" value={workHistory} onChange={(e) => handleChange('workHistory', e.target.value)}/>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="rate">
            Rate
          </label>
          <div class="flex flex-row items-center">
            <div class="text-gray-700 text-sm font-bold shadow appearance-none border border-r-0 rounded-l bg-slate-200 w-min py-2 px-3 text-gray leading-tight focus:outline-none focus:shadow-outline">$/Hr</div>
            <input class="shadow appearance-none border border-l-0 rounded-r w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="rate" type="text" placeholder="Ex. 30" value={rate} onChange={(e) => handleChange('rate', e.target.value)} />
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="location">
            Location
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="location" type="text" placeholder="Location" value={location} onChange={(e) => handleChange('location', e.target.value)}/>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="timezone">
            Timezone Preference
          </label>
          <MultiSelect  type="timezone" id={props.profile._id} selected={props.profile.timezones} handleChange={handleChange}/>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="portfolio">
            Portfolio Images (url)
          </label>
          <MultiSelect  type="portfolio" id={props.profile._id} selected={props.profile.portfolio} handleChange={handleChange}/>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="overview">
            Skills
          </label>
          <MultiSelect  type="skills" id={props.profile._id} selected={props.profile.skills} handleChange={handleChange}/>
        </div>
      </form>
    </div>
  )
}