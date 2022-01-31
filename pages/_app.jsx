// import '../styles/globals.css'
// import { AppProps } from 'next/app'

// function MyApp() {
//   return <div>MyApp</div>
// }

// export default MyApp

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp