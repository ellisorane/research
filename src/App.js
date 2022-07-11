import React from 'react';
import { Routes, Route } from "react-router-dom";

import './App.scss';

import Navbar from './components/Navbar/Navbar';
import Discover from './components/Discover/Discover';
import BrowseAll from './components/Discover/BrowseAll/BrowseAll';
import SingleEntry from './components/Discover/DiscoverEntry/SingleEntry/SingleEntry';
import StartProject from './components/StartProject/StartProject';
import Profile from './components/Profile/Profile';
import Footer from './components/Footer/Footer';



const App = () => {
  
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={ <Discover /> } />
        <Route path="/browse-all" element={ <BrowseAll /> } />
        <Route path="/entry" element={ <SingleEntry /> } />
        <Route path="/start-project" element={ <StartProject /> } />
        <Route path="/profile" element={ <Profile /> } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
