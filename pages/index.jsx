import Head from 'next/head';
import NavbarSplash from '../components/NavbarSplash';
import React, { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredImages = ['/ben-rosett-WdJkXFQ4VHY-unsplash.jpg', '/thisisengineering-raeng-TXxiFuQLBKQ-unsplash.jpg', '/pexels-fauxels-3184405.jpg'];
  let count = 0;
  const slideRef = useRef();

  useEffect( () => {
      setInterval(() => {
        handleNextClick();

      }, 5000);
      // slideRef.current.addEventListener("animationend", removeAnimation);
  }, []);

  const handleNextClick = () => {
    count = (count + 1) % featuredImages.length;
    setCurrentIndex(count);
    // slideRef.current.classList.add("fade-anim");
  };

  const removeAnimation = () => {
    slideRef.current.classList.remove("fade-anim");
  }

  const handlePreviousClick = () => {
    count = (currentIndex + featuredImages.length - 1) % featuredImages.length;
   setCurrentIndex(count);
  };


  return (
    <div>
      <Head>
        <title>Hire Up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarSplash/>
      <div className="max-w-full">
        <div ref={slideRef} className="w-full absolute select-none">
          <img src={featuredImages[currentIndex]} alt="" />
          <div className="absolute w-full top-1/2 transform -translate-y-1/2 flex justify-between items-start px-3">
          </div>
        </div>
      </div>
    </div>
  )
};
