import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Result from "./Result";
import { setSuggested, setSearchInput, setTimer } from "../../../features/searchBar/searchBarSlice";

import classes from '../Navbar.module.scss';

const NavSearch = () => {
    const projects = useSelector(state => state.projects.data[0]);
    const suggested = useSelector(state => state.searchBar.suggested);
    const searchInput = useSelector(state => state.searchBar.searchInput);
    const timer = useSelector(state => state.searchBar.timer);
    const dispatch = useDispatch();
    // const [suggested, setSuggested] = useState([]);
    // const [searchInput, setSearchInput] = useState('');
    // const [timer, setTimer] = useState(null);

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
                    // console.log(proj);
                    // console.log(input);
                    // console.log(proj.title);
                    if(proj.title.toLowerCase().includes(input.toLowerCase())) {
                        tempSearchArr.push(proj);
                        // console.log(proj);
                    } 
                });

            }

            // Set tempSearchArr as suggested state
            dispatch(setSuggested(tempSearchArr));
            
        }, 500)));

        return suggested;
        
    }

    return (
        <div>
            <div className={classes.navSearch}>
                <form action="">
                    <input type='input' value={ searchInput } placeholder="Search projects" onChange={(e) => searchLogic(e)} />
                    <input type="submit" value="Go" />
                </form>
            </div>

            { suggested.length ? <div className={classes.results}>
                { suggested.map(project => <Result key={project._id} project={project} dispatch={dispatch} setSuggested={setSuggested} setSearchInput={setSearchInput} />) }
            </div> : null}
        </div>
    );
}

export default NavSearch;