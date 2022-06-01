import '/styles/main.scss';

import { FlagsProvider } from 'flagged';

import Navigation from '../components/Navigation';
import features from '../constants/features';

function App({ Component, pageProps }) {
  return (
    <FlagsProvider features={features}>
      <div className="App m-auto px-4 lg:px-0 lg:max-w-3xl mb-[120px]">
        <Navigation />
        <Component {...pageProps} />
      </div>
    </FlagsProvider>
  );
}

export default App;
