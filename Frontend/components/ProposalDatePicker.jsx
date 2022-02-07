import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function ProposalDatePicker(props) {
  const [date, setDate] = useState(new Date(props.date));

  useEffect(() => {
    setDate(props.date);
  }, [props.date]);

  const handleChange = (date) => {
    setDate(date);
    props.handleChange(date);
  };

  return (
    <div class="shadow appearance-none border rounded w-min py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex flex-row items-center" >
      <DatePicker key={props.id} selected={date ? date : new Date()} onChange={handleChange} />
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
};