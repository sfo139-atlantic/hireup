import React from 'react';
import { useRouter } from 'next/router';

export default function redirect() {
  const router = useRouter();
  setTimeout(()=>router.push('/login'), 2200)
  return(
    <div className="flex flex-col w-full h-full items-center mt-40">
      <img src="https://i.gifer.com/Mhys.gif"  className="object-cover w-full h-full mb-0"  />
      <p className="text-9xl font-thin">To LogIn page</p>
    </div>
  )
}