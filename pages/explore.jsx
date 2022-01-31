import React, { useState } from 'react';
import Navbar from '../components/Navbar';

import { DropDownMenu } from '../components/DropDownMenu.jsx';

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
  flex
  flex-row
`
const Explore = () => {
  const [usersData, setUsersData] = useState([]);
  const [specialty, setSpecialty] = useState('');
  const [sort, setSort] = useState('');
  const [timezone, setTimezone] = useState('');

  return (
    <>
    <Navbar/>
    <div className={exploreContainer}>
      <div className={sortAndFilter}>
        <DropDownMenu name={'Specialty'} options={['Production Manager', 'Software Engineer', 'Designer']} clickHandler={setSpecialty} />
        <DropDownMenu name={'Hourly Rate'} options={['Highest to Lowest', 'Lowest to Highest']} clickHandler={setSort} />
        <DropDownMenu name={'Time Zone'} options={['PST', 'MST', 'CST', 'EST', 'Outside of U.S.']} clickHandler={setTimezone} />
      </div>
      <div className={exploreGallery}>
        
      </div>
    </div>
    </>
  )
};

export default Explore;
