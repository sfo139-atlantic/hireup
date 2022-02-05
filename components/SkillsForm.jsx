import React, { useState, useEffect } from 'react';
import MultiSelect from './MultiSelect.jsx';


export default function ProposalForm({ profile, updateProfile}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [portfolio, setPortfolio] = useState([]);
  const [education, setEducation] = useState('');
  const [workHistory, setWorkHistory] = useState('');
  const [skills, setSkills] = useState(null);
  const [rate, setRate] = useState('');
  const [location, setLocation] = useState('');
  const [timezones, setTimezones] = useState([]);

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
      'location': setLocation
    };
    typeToSetState[type](value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      firstName,
      lastName,
      portfolio,
      education,
      workHistory,
      skills,
      rate,
      location,
      timezones
    });
  };

  useEffect(() => {
    setFirstName(profile.firstName);
    setLastName(profile.lastName);
    setPortfolio(profile.portfolio);
    setEducation(profile.education);
    setWorkHistory(profile['work_history']);
    setSkills(profile.skills);
    setRate(profile.rate);
    setLocation(profile.location);
    setTimezones(profile.timezone);
  }, [profile]);

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
          <div class="relative flex w-full flex-wrap items-stretch mb-3">
            <span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <input type="text" placeholder="Placeholder" class="px-3 py-1.5 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-md border border-blueGray-300 outline-none focus:outline-none focus:ring w-full pl-10" id="rate" placeholder="Ex. 30" value={rate} onChange={(e) => handleChange('rate', e.target.value)}/>
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
          {profile ? <MultiSelect  type="timezones" id={profile._id} selected={profile.timezones} handleChange={handleChange}/> : null}

        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="portfolio">
            Portfolio Images (url)
          </label>
          {profile ? <MultiSelect  type="portfolio" id={profile._id} selected={profile.portfolio} handleChange={handleChange}/> : null}
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="skills">
            Skills
          </label>
          { profile ? <MultiSelect  type="skills" id={profile._id} selected={profile.skills} handleChange={handleChange}/> : null}
        </div>
        <div className="flex items-end">
          <button className="transition ease-in-out delay-50 bg-transparent border border-green text-green hover:bg-green hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" onClick={handleSubmit}>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
