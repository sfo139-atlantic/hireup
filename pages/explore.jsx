import React, { useState } from 'react';

import { DropDownMenu } from '../components/DropDownMenu.jsx';

const exploreContainer = `
  flex
  flex-col
  border-solid
  border-2
  border-black
  justifiy-start
`;
const sortAndFilter = `
  flex
  flex-row
  border-solid
  border-2
  border-black
`;

const exploreGallery =`
  flex
  flex-row
  border-solid
  border-2
  border-black
`
const Explore = () => {
  const [usersData, setUserData] = useState([]);
  const [specialty, setSpecialty] = useState('');
  const [sort, setSort] = useState('');
  const [timezone, setTimezone] = useState('');

  return (
    <div className={exploreContainer}>
      <div className={sortAndFilter}>
        <DropDownMenu name={'Specialty'} options={['Production Manager', 'Software Engineer', 'Designer']} clickHandler={setSpecialty} />
        <DropDownMenu name={'Hourly Rate'} options={['Highest to Lowest', 'Lowest to Highest']} clickHandler={setSort} />
        <DropDownMenu name={'Time Zone'} options={['PST', 'MST', 'CST', 'EST', 'Outside of U.S.']} clickHandler={setTimezone} />
      </div>
      <div className={exploreGallery}>Pictures</div>
    </div>
  )
};

export default Explore;
