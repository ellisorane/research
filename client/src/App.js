import React, { useEffect, useReducer, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Routes, Route } from "react-router-dom";

import './App.scss';

import Navbar from './components/Navbar/Navbar';
import Discover from './components/Discover/Discover';
import BrowseAll from './components/Discover/BrowseAll/BrowseAll';
import SingleEntry from './components/Discover/DiscoverEntry/SingleEntry/SingleEntry';
import StartProject from './components/StartProject/StartProject';
import Profile from './components/Profile/Profile';
import Footer from './components/Footer/Footer';
import Counter from './components/Counter/Counter';

import { setProjects } from './features/projects/projectsSlice';


const App = () => {
  const projects = useSelector(state => state.projects.data[0]);
    const loading = useSelector(state => state.projects.loading);
    const dispatch = useDispatch();
    const [category, setCategory] = useState('all');


    const getLatestProjects = async() => {
        try {
            const res = await axios.get('/projects');
            await dispatch(setProjects(res.data));
        } catch(err) {
            console.error(err);
        }
    }

    const getDaysLeft = (createdOn, daysToFund) => {
      const projectCreatedOn = new Date(createdOn).getTime();
      const today = new Date().getTime();
      const daysSinceCreation = (today - projectCreatedOn)/(1000 * 60 * 60 *24);
      const daysLeft = daysToFund - daysSinceCreation.toFixed(0);
      return daysLeft;
      

  }

    useEffect(() => {
        getLatestProjects();
    }, []);
  
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={ <Discover getDaysLeft={getDaysLeft} projects={projects} loading={loading} category={category} setCategory={setCategory} />  } />
        <Route path="/browse-all" element={ <BrowseAll getDaysLeft={getDaysLeft} projects={projects} loading={loading} category={category} setCategory={setCategory} /> } />
        <Route path="/entry/:id" element={ <SingleEntry getDaysLeft={getDaysLeft} /> } />
        <Route path="/start-project" element={ <StartProject /> } />
        <Route path="/profile" element={ <Profile getDaysLeft={getDaysLeft} projects={projects} loading={loading} /> } />
        <Route path="/counter" element={ <Counter /> } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
