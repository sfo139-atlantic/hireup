import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, logout } from "../src/firebase";
import Navbar from '../components/Navbar';
import { DropDownMenu } from '../components/DropDownMenu';
import { aLinkGreen } from '../styles/styles.js';
import { numberWithCommas } from '../src/helperFunctions.js';

const exploreContainer = `
  flex
  flex-col
  justifiy-start
`;
const sortAndFilter = `
  flex
  flex-row
`;
const resetButton = `
  px-4 py-1 rounded-xl text- font-semibold text-green border border-green hover:text-white hover:bg-green
  mt-5
  w-18
  h-8
`;
const exploreGallery =`
  overflow-auto
  flex
  flex-row
  shrink-0
  gap-x-16
  gap-y-8
  justify-start
  p-8
`;
const profileCard = `
  flex
  flex-col
  shrink-0
  grow-0
  w-78
  h-96
  gap-y-1
`;
const profiileImageContainer = `
  object-cover
  w-72
  h-72
`;
const profileImage = `
  shrink-0
  grow-0
  w-full
  h-full
  rounded-md
`;
const userDescription = `
  pl-1
  w-72
`;
const nameStyling = `
  ${userDescription}
  font-semibold
`;
const rateStyling = `
  ${userDescription}
  text-grey
  text-sm
`;
const titleStyling = `
  ${userDescription}
  text-grey
  flex-wrap
  text-xs
`;
const viewProfile = `
  ${aLinkGreen}
  pl-24
  `
const ExploreProposals = () => {
  const [user, loading, error] = useAuthState(auth);
  const [usersData, setUsersData] = useState([]);
  const [sort, setSort] = useState('');
  const [timezone, setTimezone] = useState('');
  useEffect(() => {
    axios.get('http://localhost:3001/profiles')
      .then((results) => {
        let data = results.data;
        const proposalsData = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].proposals.length) {
            let newProp = data[i].proposals.map(el => el.budget === undefined || el.budget === null ? {...el, budget: "0"} : el);
            proposalsData = [...proposalsData, ...newProp];
          }
        }
        console.log(proposalsData);
        if (sort === 'Highest to Lowest') {
          proposalsData.sort(({ budget: a }, { budget: b }) => (a > b) ? -1 : 1);
        }
        if (sort === 'Lowest to Highest') {
          proposalsData.sort(({ budget: a }, { budget: b }) => (a > b) ? 1 : -1);
        }
        if (timezone === '') {
          setUsersData(proposalsData)
        }
        if (timezone !== '') {
          const sortedProfiles = proposalsData.filter(ele => ele.timezones.indexOf(timezone) > -1);
          setUsersData(sortedProfiles);
        }
      })
      .catch((err) => {
        throw err
      })
  }, [sort, timezone]);
  return (
    <>
      <Navbar />
      <div className={exploreContainer}>
        <div className={sortAndFilter}>
          <DropDownMenu name={'Budget'} options={['Highest to Lowest', 'Lowest to Highest']} clickHandler={setSort} />
          <DropDownMenu name={'Time Zone'} options={['Pacific', 'Mountain', 'Central', 'Eastern', 'Outside of U.S.']} clickHandler={setTimezone} />
          <button
            type="button"
            className={resetButton}
            onClick={() => {
              setTimezone('');
              setSort('');
            }}>
              Reset
          </button>
        </div>
        <div className={exploreGallery}>
          {usersData.map((user, index) => {
            return (
              <div className={profileCard} key={index}>
                <div className={profiileImageContainer}>
                  <img className={profileImage} src="profile_placeholder_lightbg.jpeg" />
                </div>
                <div className={nameStyling}>
                {user.headline }
                </div>
                <div className={rateStyling}>
                  Budget:{' $'}{numberWithCommas(user.budget)}
                </div>
                <div className={titleStyling}>
                  {user.overview === undefined || user.overview === '' ?'unknown' : user.overview}
                </div>
                {/* <a className={viewProfile} href="profile" >View Profile</a> */}
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
};

export default ExploreProposals;
