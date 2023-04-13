import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/index.css';
import App from './App';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faForwardFast, faPlay, faPause, faGreaterThan } from '@fortawesome/free-solid-svg-icons';



library.add(faCheckSquare, faForwardFast, faPlay, faPause, faGreaterThan);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
