import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Routes, Route, Navigate } from "react-router-dom";
import { setAuthToken } from './utils/utils';


import './App.scss';

import { setProjects } from './features/projects/projectsSlice';
import  { loadUser, loginRefresh, logout } from './features/auth/authSlice'

const Navbar = React.lazy(() => import('./components/Navbar/Navbar'));
const Signup = React.lazy(() => import('./components/Auth/Signup'));
const Login = React.lazy(() => import('./components/Auth/Login'));
const Discover = React.lazy(() => import('./components/Discover/Discover'));
const BrowseAll = React.lazy(() => import('./components/Discover/BrowseAll/BrowseAll'));
const SingleEntry = React.lazy(() => import('./components/Discover/DiscoverEntry/SingleEntry/SingleEntry'));
const StartProject = React.lazy(() => import('./components/StartProject/StartProject'));
const Profile = React.lazy(() => import('./components/Profile/Profile'));
const SearchResults = React.lazy(() => import('./components/SearchResults/SearchResults'));
const Footer = React.lazy(() => import('./components/Footer/Footer'));
const Load = React.lazy(() => import('./components/Load/Load'));
const Spinner = React.lazy(() => import('./components/Spinner/Spinner'));


const App = () => {
  const projects = useSelector(state => state.projects.data[0]);
  const loadingProjects = useSelector(state => state.projects.loading);
  const tokenState = useSelector( state => state.auth.token )
  const user = useSelector( state => state.auth.user )
  const loggedIn = useSelector( state => state.auth.loggedIn )
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
      } catch(err) {
        console.log(err);
      }

    }

    const getCurrentUser = async() => {
      // Set token in the header
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
  
      try {
        const res = await axios.get('/user/')
        // console.log(res.data.user)
        dispatch( loadUser( res.data.user ) )
      } catch ( err ) {
        console.log( err )
        // dispatch( logout() )
      }
    }

    const getLatestProjects = async() => {
      try {
        const res = await axios.get('/projects');
        if (res.data) {
          // console.log( 'Here are the latest projects')
          dispatch(setProjects(res.data));
          // console.log(projects)
        }
        return projects;
      } catch(err) {
        console.error(err);
      }
    }

    const loadData = () => {
      getLatestProjects();
      !loadingProjects && projects.forEach(proj => getDaysLeft(proj.date, proj.daysToFund, proj._id));
      // Only load user if token is detected
      tokenState && getCurrentUser()
    }
    

    useEffect(() => {
      loadData();
    }, []);
  
  return (
    <div className="App">
      <Load loadData={loadData}>
        <React.Suspense fallback={<Spinner />}>
          <Navbar />
          <Routes>
            {/* Public Routes  */}
            <Route path="/" element={ <Discover projects={projects} loading={loadingProjects} category={category} setCategory={setCategory} />  } />
            <Route path="/login" element={ loggedIn ? <Navigate to="/" /> : <Login getCurrentUser={ getCurrentUser } /> } />
            <Route path="/signup" element={ loggedIn ? <Navigate to="/" /> : <Signup getCurrentUser={ getCurrentUser } /> } />
            <Route path="/browse-all" element={ <BrowseAll projects={projects} loading={loadingProjects} category={category} setCategory={setCategory} /> } />
            <Route path="/entry/:id" element={ <SingleEntry /> } />
            <Route path="/results/search=:searchTerm" element={ <SearchResults projects={projects} loading={loadingProjects} /> } />
            {/* Private Routes  */}
            <Route path="/start-project" element={ !loggedIn ? <Navigate to="/" /> : <StartProject /> } />
            <Route path="/profile" element={ !loggedIn ? <Navigate to="/" /> : <Profile projects={projects} loading={loadingProjects} getCurrentUser={ getCurrentUser } /> } />
          </Routes>
        </React.Suspense>

        <Footer />
      </Load>

    </div>
  );
}

export default App;
