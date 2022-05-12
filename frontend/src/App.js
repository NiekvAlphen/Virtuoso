import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Index from './components/Index';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Create from './components/Create';
import Error from './components/Error';
import MyCollections from './components/MyCollections';
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
    </Router>
  )
}
export default App