import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import { setSearchInput, setSuggested } from '../../features/searchBar/searchBarSlice';
// import Spinner from '../Spinner/Spinner';
// import DiscoverEntry from '../Discover/DiscoverEntry/DiscoverEntry';

import classes from './SearchResults.module.scss';

const Spinner = React.lazy(() => import('../Spinner/Spinner'));
const DiscoverEntry = React.lazy(() => import('../Discover/DiscoverEntry/DiscoverEntry'));

const SearchResults = () => {
    const dispatch = useDispatch();
    const { searchTerm } = useParams();
    const projects = useSelector(state => state.projects.data[0]);
    const suggested = useSelector(state => state.searchBar.suggested);
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);

    const getResults = async() => {
        let tempArr= [];
        await projects && projects.forEach(proj => {
            if(proj.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                tempArr.push(proj);
            } 
        });
        dispatch(setSearchInput(''));
        dispatch(setSuggested([]));
        setResults(tempArr);
        setLoading(false);
        
    }

    useEffect(() => {
        getResults();    
    }, [searchTerm, projects]);

    return(
        <div className={classes.searchResults}>
            <h2 className={classes.heading}><u>Results for: {searchTerm}</u></h2>
            { !loading ? <div className={classes.resContainer}>
            { results.map(project => <DiscoverEntry key={project._id} project={project} />) }
            </div> : <Spinner />}
            {results.length === 0 && <h2>No Results</h2>}
        </div>
    );
}

export default SearchResults;