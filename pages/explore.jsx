import React, { useState } from 'react';

import { DropDownMenu } from '../components/DropDownMenu.jsx';

const exploreContainer = `
  display: flex
  flex-direction: column
  border-solid
  border-2
  border-black
`;
const sortAndFilter = `
  border-solid
  border-2
  border-black
  display: flex
  flex-direction: row
`;
const Explore = () => {
  const [usersData, setUserData] = useState([]);

  return (
    <div className={exploreContainer}>
      <div className={sortAndFilter}>
        <DropDownMenu name={'Specialty'} options={['Production Manager', 'Software Engineer', 'Designer']}/>
        <DropDownMenu name={'Hourly Rate'} options={['Highest to Lowest', 'Lowest to Highest']}/>
        <DropDownMenu name={'Time Zone'} options={['PST', 'MST', 'CST', 'EST', 'Outside of U.S.']}/>
      </div>

    </div>
  )
}

export default Explore;