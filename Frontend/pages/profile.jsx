import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuthState } from "react-firebase-hooks/auth";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import UserContext from '../src/context.jsx';
import Navbar from '../components/Navbar.jsx';
import { auth, logout } from "../src/firebase";

const fakeData = {
  portfolio:["https://source.unsplash.com/WLUHO9A_xik/1600x900", "https://source.unsplash.com/WLUHO9A_xik/1600x900", "https://source.unsplash.com/WLUHO9A_xik/1600x900"]
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
  const {viewProfileID, setViewProfileID} = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      return;
    }

    if (!viewProfileID) {
      axios.get('http://localhost:3001/profiles/findOne', {params: {
        uid: user.uid
      }})
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      axios.get('http://localhost:3001/profiles/findOne', {params: {
      uid: viewProfileID
      }})
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [user]);

  const handleContactClick = (event) => {
    if (user.uid !== viewProfileID) {
      axios.post('http://localhost:3001/message',
      {
        users: [user.uid, userData._id]
      })
      .then((res) => {
        console.log(res);
      })
      .then(()=> {
        router.push('/messages');
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  return (
    <div>
      <Navbar />
      <div className='flex h-full w-128 justify-between'>
        <div className='flex flex-col h-full min-w-[24rem] w-104 ml-6 mt-6 border-r border-[#7D7D7D] mr-4'>
          <div>
            <img className='h-64 w-64 rounded-full mx-auto mt-2' src={typeof userData.profile_pic === 'string' ? userData.profile_pic : "profile_placeholder_lightbg.jpeg"}></img>
          </div>
          <div className="flex justify-center">
            <a className="transition ease-in-out delay-50 bg-transparent border border-green text-green hover:bg-green hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2 cursor-pointer" onClick={handleContactClick}>Contact</a>
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-row justify-between my-2 ml-8'>
              <div className='flex'>
                <div className='text-[#7D7D7D] mr-2'>{nameOfUserIcon}</div>
                <div className='text-[#7D7D7D]'>Name:</div>
              </div>
                <div className='text-right mr-4'>{` ${userData.firstName} ${userData.lastName}`}</div>
            </div>
            <div className='flex flex-row justify-between my-2 ml-8'>
              <div className='flex'>
                <div className='text-[#7D7D7D] mr-2'>{hourlyRateIcon}</div>
                <div className='text-[#7D7D7D]'>Hourly Rate:</div>
              </div>
                <div className='mr-4'>${userData.rate}</div>
            </div>
            <div className='flex flex-row justify-between my-2 ml-8'>
              <div className='flex'>
                <div className='text-[#7D7D7D] mr-2'>{summaryOfUserIcon}</div>
                <div className='text-[#7D7D7D]'>Summary:</div>
              </div>
                <div className='mr-4 text-right'>{userData.work_history}</div>
            </div>
          </div>
        </div>
          <div className='flex flex-col h-7/12 w-7/12 mt-6 mr-6 rounded-lg overflow-y-auto'>
            <div className='h-full w-full mx-auto'>
              <Swiper
                spaceBetween={0}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}>
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
            <div className='w-full mx-auto p-5 border'>
              <div className='flex justify-between'>
                <div>
                  <h1 className='my-2 text-[#7D7D7D]'>
                    Educations:
                  </h1>
                </div>
                <p className='my-2 ml-2'>
                  {userData.education}
                </p>
              </div>
              <div className='flex justify-between'>
                <h1 className='my-2 text-[#7D7D7D]'>
                  Description:
                </h1>
                {userData.skills?.map((eachSkill, idx) => {
                  return <p className='my-2 ml-2' key={idx}>{eachSkill}</p>
                })}
              </div>
              <div className='flex justify-between'>
                <h1 className='w-auto my-2 text-[#7D7D7D]'>
                  Work History:
                </h1>
                <p className='my-2 ml-2'>
                  {userData.work_history}
                </p>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}
