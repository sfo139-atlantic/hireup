import React, { useState } from 'react';

import { DropDownMenu } from '../components/DropDownMenu.jsx';

const exploreContainer = "border-solid border-2 border-black";
const sortAndFilter = "border-solid border-2 border-black";
const Explore = () => {
  const [usersData, setUserData] = useState([]);

  return (
    <div className={exploreContainer}>
      <div className={sortAndFilter}>
        <DropDownMenu name={'Specialty'} options={['Production Manager', 'Software Engineer', 'Designer']}/>
      </div>
    </div>
  )
}

export default Explore;