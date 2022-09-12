import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';

// import Result from "./Result";
// import DiscoverEntry from "../../Discover/DiscoverEntry/DiscoverEntry";
import { setSuggested, setSearchInput, setTimer } from "../../../features/searchBar/searchBarSlice";

import classes from '../Navbar.module.scss';

const Result = React.lazy(() => import('./Result'));
const DiscoverEntry = React.lazy(() => import("../../Discover/DiscoverEntry/DiscoverEntry"));

const NavSearch = ({ setShowNav }) => {
    const projects = useSelector(state => state.projects.data[0]);
    const suggested = useSelector(state => state.searchBar.suggested);
    const searchInput = useSelector(state => state.searchBar.searchInput);
    const timer = useSelector(state => state.searchBar.timer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchLogic = (e) => {
        
        // Reset timer a timer after each keystroke
        clearTimeout(timer);


        let input = e.target.value
        dispatch(setSearchInput(input));

        // Create array to temporarily push suggestions to until ready to be assigned to the suggested state
        let tempSearchArr = [];
        
        // set timer 
        dispatch(setTimer(setTimeout(() => {
            // Check if search input is empty 
            if(input.trim().length !== 0  && input.length > 2) {

                // Loop through projects state and see if input matches any of them 
                projects.forEach(proj => {
                    
                    if(proj.title.toLowerCase().includes(input.toLowerCase())) {
                        tempSearchArr.push(proj);
                    } 
                });

            }

            // Set tempSearchArr as suggested state
            dispatch(setSuggested(tempSearchArr));
            
        }, 500)));

        return suggested;
        
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setShowNav(false);
        navigate(`/results/search=${searchInput}`);
    }

    return (
        <div>
            <div className={classes.navSearch}>
                <form action="" onSubmit={(e) => submitHandler(e)}>
                    <input type='input' value={ searchInput } placeholder="Search projects" onChange={(e) => searchLogic(e)} />
                    <input type='submit' value="🔍" /> 
                </form>
            </div>

            { suggested.length ? <div className={classes.results}>
                { suggested.map(project => <Result key={project._id} project={project} dispatch={dispatch} setSuggested={setSuggested} setSearchInput={setSearchInput} />) }
            </div> : null}
        </div>
    );
}

export default NavSearch;