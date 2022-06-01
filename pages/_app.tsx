// import App from 'next/app'
import '/styles/main.scss';

import { FlagsProvider } from 'flagged';
import Navigation from '../components/Navigation';
import features from '../constants/features';

function MyApp({ Component, pageProps }) {
  return (
    <FlagsProvider features={features}>
      <div className="App m-auto px-4 lg:px-0 lg:max-w-3xl mb-[120px]">
        <Navigation />
        <Component {...pageProps} />
      </div>
    </FlagsProvider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
