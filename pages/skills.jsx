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
  w-40
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

const topHalfFormContainer = `
  flex
  flex-col
`;

const topHalfForm = `
  flex
  flex-col
`
const labelStyling = `
  ml-2
`;

const shortInput = `
  m-2
  rounded-md
  border
  w-44
`;

const longInput = `
  rounded-md
  m-2
  border
  w-1/2
`;

const checkBoxStyling = `
  m-2
`;

export default function skills () {
  const [userData, setData] = useState();
  const [userName, setName] = useState('');
  const [projectManagerCheck, setPMCheck] = useState(false);
  const [engineerCheck, setEngineerCheck] = useState(false);
  const [designerCheck, setDesignerCheck] = useState(false);

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
      <div className={topHalfFormContainer}>
        <form className={topHalfForm}>
          <input className={shortInput} type='text' name='name' value={userName} placeholder='Name' required></input>
          <input className={longInput} type='text' name='portfolio' value='' placeholder='Portfolio / Work Example' required></input>
          <label className={labelStyling}></label>
          <input className={longInput} type='text' name='portfolio' value='' placeholder='Education' required></input>
        </form>
      </div>
      <div>
        <label className={labelStyling}>My Roles</label>
      </div>
      <div className='flex flex-row'>
        <form className='flex'>
          <div className={checkBoxStyling}>
            <input type='checkbox' name='ProjectManager'></input>
            <label className={labelStyling}>Project Manager</label>
          </div>
          <div className={checkBoxStyling}>
            <input type='checkbox' name='Engineer'></input>
            <label className={labelStyling}>Engineer</label>
          </div>
          <div className={checkBoxStyling}>
            <input type='checkbox' name='Designer'></input>
            <label className={labelStyling}>Designer</label>
          </div>
        </form>
      </div>
      <div className='flex flex-col'>
        <form className='flex flex-col'>
          <input className={longInput} type='text' name='WorkHistory' value='' placeholder='Work History' required></input>
          <input className={longInput} type='text' name='Skills' value='' placeholder='Skills' required></input>
        </form>
        <form className='flex flex-row'>
          <div className='flex flex-col'>
            <input className={shortInput} type='number' name='HourlyRate' placeholder='0' required></input>
          </div>
          <div className='flex flex-col'>
            <input className={shortInput} type='text' name='Location' value='' placeholder='Location' required></input>
          </div>
        </form>
      </div>
    </div>
  )
};