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
    const myProjects = projects.filter(project => project.user === user._id);

    return (
        <>
            <div className={classes.profileInfo}>
                { !loading ? myProjects.map((project) => 
                    <DiscoverEntry key={project._id} project={project} />
                ) : 
                <Spinner /> }
                
            </div>
            { myProjects.length === 0 && <h3 style={{ textAlign: 'center', width: '100%', marginTop: '100px' }}>You have no Projects</h3> }
        </>
    );
}

export default MyProjects;