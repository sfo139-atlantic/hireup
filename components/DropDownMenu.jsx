import React from 'react';

const selectName =`
  bg-white
  text-black
  font-semibold
  py-2 px-4
  rounded
  inline-flex
  items-center
  cursor-pointer
`;
const dropDownMenu = `
  dropdown-menu
  absolute hidden
  text-gray-700
  pt-1
`;
const option = `
  bg-white
  hover:text-green
  py-2
  px-4
  block
  whitespace-no-wrap
  cursor-pointer
`;
const firstOption = `
  rounded-t
  ${option}
`;
const lastOption = `
  rounded-b
  ${option}
`;
export const DropDownMenu = ({ name, options, clickHandler }) => {
  return (
    <div className="p-10">
      <div className="dropdown inline-block relative">
        <button className={selectName}>
          <span className="mr-1">
            {name}
          </span>
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </button>
        <ul className={dropDownMenu}>
          {options.map((element, index) => {
            if (index === 0) {
              return (
                <li key={index} ><a className={firstOption} id={element} onClick={() => clickHandler(event.target.id)} >{element}</a></li>
              )
            }
            if (index === options.length -1) {
              return (
                <li key={index}><a className={lastOption} id={element} onClick={() => clickHandler(event.target.id)} >{element}</a></li>
              )
            }
            return (
              <li key={index}><a className={option} id={element} onClick={() => clickHandler(event.target.id)} >{element}</a></li>
            )
          })}
        </ul>
      </div>
    </div>
  )
};
