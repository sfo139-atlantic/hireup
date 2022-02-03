import { useState } from 'react';
import '../styles/globals.css'

import UserContext from '../src/context.jsx';

function MyApp({ Component, pageProps }) {
  const [viewProfileID, setViewProfileID] = useState('');
  return(
    <UserContext.Provider value={{ viewProfileID, setViewProfileID }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  )
};

export default MyApp