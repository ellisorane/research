import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from '../Profile.module.scss';
import user from '../../../imgs/default.jpg';

import DiscoverEntry from '../../Discover/DiscoverEntry/DiscoverEntry';
import Spinner from '../../Spinner/Spinner';



const ExpiredProjects = ({ projects, loading }) => {
    return (
        <div className={classes.profileInfo}>
            { !loading ? projects.map((item, index) => 
                item.daysLeft < 0 && <DiscoverEntry key={item._id} project={item} />
            ) : 
            <Spinner /> }
        </div>
    );
}

export default ExpiredProjects;