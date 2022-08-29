import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import Spinner from '../Spinner/Spinner';
import { setSearchInput, setSuggested } from '../../features/searchBar/searchBarSlice';
import DiscoverEntry from '../Discover/DiscoverEntry/DiscoverEntry';

import classes from './SearchResults.module.scss';


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
            console.log('works');
            console.log(results);
        }

        useEffect(() => {
            getResults();    
        }, [searchTerm, projects]);

        return(
            <div className={classes.searchResults}>
                <h2 className={classes.heading}>Results for: {searchTerm}</h2>
                { !loading ? <div className={classes.resContainer}>
                { results.map(project => <DiscoverEntry key={project._id} project={project} />) }
                </div> : <Spinner />}
            </div>
        );
}

export default SearchResults;