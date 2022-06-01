import './styles/main.scss';

import React from 'react';
import { FlagsProvider } from 'flagged';
import ReactDOM from 'react-dom/client';

import App from './App';
import features from './constants/features';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <FlagsProvider features={features}>
      <App />
    </FlagsProvider>
  </React.StrictMode>
);

// Documentation: https://bit.ly/CRA-vitals
reportWebVitals();
