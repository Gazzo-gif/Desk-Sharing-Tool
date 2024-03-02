import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next'; // Import the I18nextProvider
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import i18n from './i18n'; // Import the i18n instance

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}> {/* Wrap your App component with the I18nextProvider */}
      <App />
    </I18nextProvider>
  </React.StrictMode>
);

reportWebVitals();
