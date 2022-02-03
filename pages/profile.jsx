import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar.jsx'
// import Carousel from './Carousel.jsx'
import { auth, logout } from "../src/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import axios from 'axios';

const fakeData = {
  _id:1,
  firstName:"Jesse",
  lastName:"Huang",
  email:"jayjay@hireup.com",
  freelancer:{pm:true,designer:false,engineer:true},
  rate:{"$numberDecimal":"95.5"},
  work_history:"Senior project manager for Atlantic Web Development Agency",
  skills:"An experienced project manager and full stack engineer",education:"Hack Reactor",
  location:"HRSF2",
  portfolio:["https://source.unsplash.com/WLUHO9A_xik/1600x900", "https://source.unsplash.com/WLUHO9A_xik/1600x900", "https://source.unsplash.com/WLUHO9A_xik/1600x900"],
  proposals:[
    {headline:" Project Sushi-Ya",
  overview:"Irashaimase! I'm an experienced engineer looking to create the world's most efficient salmon nigiri creation algorithm.",
  timeline:{start:1643514146, end:1675050146},
  location:"Huntington Beach, CA ",
  timezones:["pacific","mountain"]}],
  profile_pic:"https://i.ibb.co/p0fyr4S/jesse.png"
}

const nameOfUserIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>;

const summaryOfUserIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
<path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd" />
</svg>;

const hourlyRateIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>;

export default function profile() {
  const [user] = useAuthState(auth);
  const [userData, setData] = useState([]);
  const [workEXP, setWork] = useState(fakeData.portfolio);

  useEffect(() => {
    axios.get('http://localhost:3001/profiles')
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  console.log(userData);

  return (
    <div>
      <Navbar />
      <div className='flex flex-row h-full w-full'>
        <div className='flex flex-col h-full w-2/5 ml-6 mt-6 border rounded-lg'>
          <div>
            <img className='h-64 w-64 rounded-full mx-auto mt-2' src={typeof fakeData.profile_pic === 'string' ? fakeData.profile_pic : "profile_placeholder_lightbg.jpeg"}></img>
          </div>
          <div className='flex justify-center'>
            <button className="transition ease-in-out delay-50 bg-transparent border border-green text-green hover:bg-green hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2">Contact</button>
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-row text-left my-2 ml-8'>
              <div className='text-[#7D7D7D] mr-2'>{nameOfUserIcon}</div>
              <div className='text-[#7D7D7D]'>Name:</div>
              <div className='text-right ml-2'>{` ${fakeData.firstName} ${fakeData.lastName}`}</div>
            </div>
            <div className='flex flex-row text-left my-2 ml-8'>
              <div className='text-[#7D7D7D] mr-2'>{summaryOfUserIcon}</div>
              <div className='text-[#7D7D7D]'>Summary:</div>
              <div className='ml-2'>{` ${fakeData.skills}`}</div>
            </div>
            <div className='flex flex-row text-left my-2 ml-8'>
              <div className='text-[#7D7D7D] mr-2'>{hourlyRateIcon}</div>
              <div className='text-[#7D7D7D]'>Hourly Rate:</div>
              <div className='ml-2'>${fakeData.rate.$numberDecimal}</div>
            </div>
          </div>
        </div>
        <div className='flex flex-row w-screen'>
          <div className='flex flex-col ml-20 h-7/12 w-7/12 mt-4 border rounded-lg overflow-y-auto'>
            <div className='h-full w-96 mx-auto mt-8'>
              <Swiper
                spaceBetween={10}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}>
                <SwiperSlide>
                  <img className='rounded-lg' src={fakeData.portfolio[0]}></img>
                  <div className='text-center'>1</div>
                </SwiperSlide>
                <SwiperSlide>
                  <img className='rounded-lg' src={fakeData.portfolio[1]}></img>
                  <div className='text-center'>2</div>
                </SwiperSlide>
                <SwiperSlide>
                  <img className='rounded-lg' src={fakeData.portfolio[2]}></img>
                  <div className='text-center'>3</div>
                </SwiperSlide>
                <SwiperSlide>
                  <img className='rounded-lg' src={fakeData.portfolio[0]}></img>
                  <div className='text-center'>4</div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div className='w-6/12 border mx-auto'>
              <div className='flex flex-row'>
                <h1 className='my-2 text-[#7D7D7D]'>
                  Educations:
                </h1>
                <p className='my-2 ml-2'>
                  {fakeData.education}
                </p>
              </div>
              <div className='flex flex-row'>
                <h1 className='my-2 text-[#7D7D7D]'>
                  Description:
                </h1>
                <p className='my-2 ml-2'>
                  {fakeData.skills}
                </p>
              </div>
              <div className='flex flex-row'>
                <h1 className='w-auto my-2 text-[#7D7D7D]'>
                  Work History:
                </h1>
                <p className='my-2 ml-2'>
                  {fakeData.work_history}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
