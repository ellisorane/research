import React, { useEffect, useReducer, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Routes, Route } from "react-router-dom";

import './App.scss';

// import Navbar from './components/Navbar/Navbar';
// import Discover from './components/Discover/Discover';
// import BrowseAll from './components/Discover/BrowseAll/BrowseAll';
// import SingleEntry from './components/Discover/DiscoverEntry/SingleEntry/SingleEntry';
// import StartProject from './components/StartProject/StartProject';
// import Profile from './components/Profile/Profile';
// import SearchResults from './components/SearchResults/SearchResults';
// import Footer from './components/Footer/Footer';
// import Counter from './components/Counter/Counter';
// import ScrollToTop from './components/ScrollToTop/ScrollToTop';
// import Spinner from './components/Spinner/Spinner';

import { setProjects } from './features/projects/projectsSlice';

const Navbar = React.lazy(() => import('./components/Navbar/Navbar'));
const Discover = React.lazy(() => import('./components/Discover/Discover'));
const BrowseAll = React.lazy(() => import('./components/Discover/BrowseAll/BrowseAll'));
const SingleEntry = React.lazy(() => import('./components/Discover/DiscoverEntry/SingleEntry/SingleEntry'));
const StartProject = React.lazy(() => import('./components/StartProject/StartProject'));
const Profile = React.lazy(() => import('./components/Profile/Profile'));
const SearchResults = React.lazy(() => import('./components/SearchResults/SearchResults'));
const Footer = React.lazy(() => import('./components/Footer/Footer'));
const Counter = React.lazy(() => import('./components/Counter/Counter'));
const ScrollToTop = React.lazy(() => import('./components/ScrollToTop/ScrollToTop'));
const Spinner = React.lazy(() => import('./components/Spinner/Spinner'));


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
      // console.log('works')
    }
    

    useEffect(() => {
      loadData();
    }, [loading]);
  
  return (
    <div className="App">
      <ScrollToTop>
        <React.Suspense fallback={<Spinner />}>
          <Navbar />
          <Routes>
            <Route path="/" element={ <Discover projects={projects} loading={loading} category={category} setCategory={setCategory} />  } />
            <Route path="/browse-all" element={ <BrowseAll projects={projects} loading={loading} category={category} setCategory={setCategory} /> } />
            <Route path="/entry/:id" element={ <SingleEntry getLatestProjects={getLatestProjects} /> } />
            <Route path="/start-project" element={ <StartProject getLatestProjects={getLatestProjects} /> } />
            <Route path="/profile" element={ <Profile projects={projects} loading={loading} /> } />
            <Route path="/results/search=:searchTerm" element={ <SearchResults projects={projects} loading={loading} /> } />
            <Route path="/counter" element={ <Counter /> } />
          </Routes>
        </React.Suspense>

        <Footer />
      </ScrollToTop>

    </div>
  );
}

export default App;
