import React from "react";
import { Link } from "react-router-dom";

import classes from '../Navbar.module.scss';
// import testImg from '../../../imgs/fruit research.jpg';

const Result = ({project, dispatch, setSearchInput, setSuggested}) => {

    const resetSearch = () => {
        dispatch(setSearchInput(''));
        dispatch(setSuggested([]));
    }

    return(
        <Link to={`/entry/${project._id}`} className={classes.result} onClick={() => resetSearch()}>
            <div style={{ backgroundImage: `url("${project.imageURL}")` }}  className={classes.resultThumb}></div>
            <div className={classes.resultText}>
                <h4>{project.title}</h4>
                <p>{project.researchers}</p>
            </div>
        </Link>
    );
}


export default Result;