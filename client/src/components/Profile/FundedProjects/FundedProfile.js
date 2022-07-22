import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from '../Profile.module.scss';
import user from '../../../imgs/default.jpg';

import DiscoverEntry from '../../Discover/DiscoverEntry/DiscoverEntry';



const FundedProjects = () => {
    return (
        <div className={classes.profileInfo}>
            <DiscoverEntry />
            <DiscoverEntry />
            
        </div>
    );
}

export default FundedProjects;