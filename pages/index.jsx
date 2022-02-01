import Head from 'next/head';
import NavbarSplash from '../components/NavbarSplash';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Hire Up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarSplash/>
      <img src="https://images.unsplash.com/photo-1425421669292-0c3da3b8f529?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb"/>
    </div>
  )
}
