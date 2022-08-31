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
import SearchResults from './components/SearchResults/SearchResults';
import Footer from './components/Footer/Footer';
import Counter from './components/Counter/Counter';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

import { setProjects } from './features/projects/projectsSlice';


const App = () => {
  const projects = useSelector(state => state.projects.data[0]);
  const loading = useSelector(state => state.projects.loading);
  const dispatch = useDispatch();
  const [category, setCategory] = useState('all');

  const getDaysLeft = async(createdOn, daysToFund, id) => {
      
      const projectCreatedOn = new Date(createdOn).getTime();
      const today = new Date().getTime();
      const daysSinceCreation = (today - projectCreatedOn)/(1000 * 60 * 60 *24);
      const daysLeft = daysToFund - daysSinceCreation.toFixed(0);

      const config = {
        headers: {
            'Content-Type': 'application/json'
        }
      }
      const body = JSON.stringify({ daysLeft });
      
      try {
        await axios.post(`/projects/daysLeft/${id}`, body, config);
        // console.log('Worked');
      } catch(err) {
        console.log(err);
      }

    }

    const getLatestProjects = async() => {
        try {
            const res = await axios.get('/projects');
            dispatch(setProjects(res.data));
            return projects;
          } catch(err) {
            console.error(err);
          }
    }

    const loadData = () => {
      getLatestProjects();
      !loading && projects.forEach(proj => getDaysLeft(proj.date, proj.daysToFund, proj._id));
      getLatestProjects();
      console.log('works')
    }

    

    useEffect(() => {
      loadData();
    }, [loading]);
  
  return (
    <div className="App">
      <ScrollToTop>
        <Navbar />
        <Routes>
          <Route path="/" element={ <Discover projects={projects} loading={loading} category={category} setCategory={setCategory} />  } />
          <Route path="/browse-all" element={ <BrowseAll projects={projects} loading={loading} category={category} setCategory={setCategory} /> } />
          <Route path="/entry/:id" element={ <SingleEntry /> } />
          <Route path="/start-project" element={ <StartProject /> } />
          <Route path="/profile" element={ <Profile projects={projects} loading={loading} /> } />
          <Route path="/results/search=:searchTerm" element={ <SearchResults projects={projects} loading={loading} /> } />
          <Route path="/counter" element={ <Counter /> } />
        </Routes>
        <Footer />
      </ScrollToTop>

    </div>
  );
}

export default App;
