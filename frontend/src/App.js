import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import Index from './components/Index';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Create from './components/Create';
import Error from './components/Error';
import MyCollections from './components/MyCollections';
import AudioPlayerComponent from './components/AudioPlayerComponent';

const Footer = () => {
  const location = useLocation()
  console.log(location.pathname)

  return (
    <>
      {location.pathname != '/' && location.pathname !='/login' && location.pathname !='/signup' && (
        <div>
          <AudioPlayerComponent />
        </div>
      )}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create" element={<Create />} />
        <Route path="/my-collections" element={<MyCollections />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  )
}
export default App