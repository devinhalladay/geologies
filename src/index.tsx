import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FlagsProvider } from 'flagged';
import features from './constants/features';
import { HomebaseProvider } from 'homebase-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FlagsProvider features={features}>
      <HomebaseProvider
        config={{ initialData: [{ counter: { id: 1, count: 0 } }] }}
      >
        <App />
      </HomebaseProvider>
    </FlagsProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
