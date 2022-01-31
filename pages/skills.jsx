import React, { useState } from 'react';
import tailwind from '../tailwind.config.js';

const overallContainer = `
  flex
  flex-col
`;

const headerContainer = `
  flex
  border-b-2
  border-[${tailwind.theme.colors.green}]
  justify-between
`;

const exploreAndMyProfileContainer = `
  flex
  justify-between
  border
  border-black
  w-48
`;

const hireUpText = `
  font-['Open_sans']
  font-semibold
  text-[${tailwind.theme.colors.green}]
  text-5xl
`;

const exploreContainer = `
  flex
  flex-row
`;

const headerLink = `
  text-xs
`;

const titleStyling =`
  text-xl
  text-sky-400
`;

const searchIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
</svg>;

const userIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
<path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
</svg>;

export default function skills () {

  return (
    <div className={overallContainer}>
      <div className={headerContainer}>
        <div>
          <span className={hireUpText}>HireUp</span>
        </div>
        <div className={exploreAndMyProfileContainer}>
          <span className={exploreContainer}>
            {searchIcon}
            <div className={headerLink}>Explore</div>
          </span>
          <span className={exploreContainer}>
            {userIcon}
            <div className={headerLink}>My Profile</div>
          </span>
        </div>
      </div>
      <div>
        <form>
          <input type='checkbox'></input>
          <label>Project Manager</label>
          <input type='checkbox'></input>
          <label>Engineer</label>
          <input type='checkbox'></input>
          <label>Designer</label>
        </form>
      </div>
    </div>
  )
};