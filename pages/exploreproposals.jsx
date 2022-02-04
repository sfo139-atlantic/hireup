import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, logout } from "../src/firebase";
import Navbar from '../components/Navbar';
import { DropDownMenu } from '../components/DropDownMenu';
import {
  aLinkGreen,
  exploreContainer,
  sortAndFilter,
  resetButton,
  exploreGallery,
} from '../styles/styles.js';
import { numberWithCommas } from '../src/helperFunctions.js';

const proposalCard = `
  flex
  flex-col
  shrink-0
  grow-0
  w-78
  h-96
  gap-y-1
`;
const proposalImageContainer = `
  object-cover
  w-72
  h-72
`;
const proposalImage = `
  shrink-0
  grow-0
  w-full
  h-full
  rounded-md
`;
const proposalDescription = `
  pl-1
  w-72
`;
const proposalNameStyling = `
  ${proposalDescription}
  min-h-[1.25rem]
  font-semibold
`;
const proposalBudgetStyling = `
  ${proposalDescription}
  text-grey
  text-sm
`;
const proposalSummary = `
  ${proposalDescription}
  text-grey
  flex-wrap
  text-xs
`;
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
        if (sort === 'Highest to Lowest') {
          proposalsData.sort(({ budget: a }, { budget: b }) => (a > b) ? -1 : 1);
        }
        if (sort === 'Lowest to Highest') {
          proposalsData.sort(({ budget: a }, { budget: b }) => (a > b) ? 1 : -1);
        }
        if (timezone === '') {
          setUsersData(proposalsData);
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
              <div className={proposalCard} key={index}>
                <div className={proposalImageContainer}>
                  <img className={proposalImage} src="proposal.jpeg" />
                </div>
                <div className={proposalNameStyling}>
                {user.headline}
                </div>
                <div className={proposalBudgetStyling}>
                  Budget:{' $'}{numberWithCommas(user.budget)}
                </div>
                <div className={proposalSummary}>
                  {user.overview === undefined || user.overview === '' ?'unknown' : user.overview}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
};

export default ExploreProposals;
