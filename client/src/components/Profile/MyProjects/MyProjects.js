import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from '../Profile.module.scss';
import user from '../../../imgs/default.jpg';
import { useSelector } from 'react-redux';

// import DiscoverEntry from '../../Discover/DiscoverEntry/DiscoverEntry';
// import Spinner from '../../Spinner/Spinner';
const DiscoverEntry = React.lazy(() => import('../../Discover/DiscoverEntry/DiscoverEntry'));
const Spinner = React.lazy(() => import('../../Spinner/Spinner'));


const MyProjects = ({ projects, loading }) => {
    const user = useSelector( state => state.auth.user )

    return (
        <div className={classes.profileInfo}>
            { !loading ? projects.map((project, index) => 
                project.user === user._id && <DiscoverEntry key={project._id} project={project}
                />
            ) : 
            <Spinner /> }
            
        </div>
    );
}

export default MyProjects;