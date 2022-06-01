import { FlagsProvider } from 'flagged';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import features from './constants/features';
import reportWebVitals from './reportWebVitals';
import './styles/main.scss';

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
