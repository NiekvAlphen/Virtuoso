import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AudioPlayerComponent from './components/AudioPlayerComponent';



ReactDOM.render(
  <React.StrictMode>
    <App />
    <AudioPlayerComponent /> 
  </React.StrictMode>,
  document.getElementById('root')
);