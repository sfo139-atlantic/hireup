import React from 'react';

export default function redirect() {
  setTimeout(()=>{window.open('/login', '_self')}, 2000)
  return(
    <div className="flex flex-col w-full h-full items-center mt-40">
      <img src="https://i.gifer.com/Mhys.gif"  className="object-cover w-full h-full mb-0"  />
      <p className="text-9xl font-thin">To LogIn page</p>
    </div>
  )
}