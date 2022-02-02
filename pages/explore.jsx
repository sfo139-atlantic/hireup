import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, logout } from "../src/firebase";
import Navbar from '../components/Navbar';
import { DropDownMenu } from '../components/DropDownMenu';
import { aLinkGreen } from '../styles/styles.js';

const numberWithCommas = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const exploreContainer = `
  flex
  flex-col
  justifiy-start
`;
const sortAndFilter = `
  flex
  flex-row
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
const Explore = () => {
  const [user, loading, error] = useAuthState(auth);
  const [usersData, setUsersData] = useState([]);
  const [specialty, setSpecialty] = useState('');
  const [sort, setSort] = useState('');
  const [timezone, setTimezone] = useState('');
  useEffect(() => {
    axios.get('http://localhost:3001/profiles')
      .then((results) => {
        let userProfiles = results.data;
        console.log(userProfiles)
        if (sort === 'Highest to Lowest') {
          userProfiles.sort(({ rate: a }, { rate: b }) => (a > b) ? 1 : -1);
        }
        if (sort === 'Lowest to Highest') {
          userProfiles.sort(({ rate: a }, { rate: b }) => (a > b) ? -1 : 1);
        }
        if (specialty === '' && timezone === '') {
          setUsersData(userProfiles)
        }
        if (specialty !== '') {
          const sortedProfiles = userProfiles.filter(ele => ele.freelancer[specialty]);
          setUsersData(sortedProfiles);
        }
        if (timezone !== '') {
          const sortedProfiles = userProfiles.filter(ele => ele.timezones.indexOf(timezone) > -1);
          setUsersData(sortedProfiles);
        }
        if (timezone !== '' && specialty !== '') {
          const sortedProfiles = userProfiles.filter(ele => ele.freelancer[specialty]).filter(ele => ele.timezones.indexOf(timezone) > -1);
          setUsersData(sortedProfiles);
        }
      })
      .catch((err) => {
        throw err
      })
  }, [specialty, sort, timezone]);
  return (
    <>
      <Navbar />
      <div className={exploreContainer}>
        <div className={sortAndFilter}>
          <DropDownMenu name={'Specialty'} options={['Production Manager', 'Software Engineer', 'Designer']} clickHandler={setSpecialty} />
          <DropDownMenu name={'Hourly Rate'} options={['Highest to Lowest', 'Lowest to Highest']} clickHandler={setSort} />
          <DropDownMenu name={'Time Zone'} options={['Pacific', 'Mountain', 'Central', 'Eastern', 'Outside of U.S.']} clickHandler={setTimezone} />
        </div>
        <div className={exploreGallery}>
          {usersData.map((user) => {
            const titles = Object.entries(user.freelancer);
            const userTitles = [];
            for (let i = 0; i < titles.length; i++) {
              if (titles[i][1]) {
                userTitles.push(titles[i][0]);
              }
            }
            const userTitleString =userTitles.join(', ');
            return (
              <div className={profileCard} key={user._id}>
                <div className={profiileImageContainer}>
                  <img className={profileImage} src={typeof user.profile_pic === 'string' ? user.profile_pic : "profile_placeholder_lightbg.jpeg"} />
                </div>
                <div className={nameStyling}>
                {user.firstName}{', '}{user.lastName}
                </div>
                <div className={rateStyling}>
                  Rate/hr:{' $'}{numberWithCommas(user.rate.$numberDecimal)}
                </div>
                <div className={titleStyling}>
                  {userTitleString}
                </div>
                <button type="button" className={aLinkGreen}>View Profile</button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
};

export default Explore;
