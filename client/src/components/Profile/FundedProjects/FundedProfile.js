import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from '../Profile.module.scss';
import user from '../../../imgs/default.jpg';
import { useSelector } from 'react-redux';

// import DiscoverEntry from '../../Discover/DiscoverEntry/DiscoverEntry';
// import Spinner from '../../Spinner/Spinner';
const DiscoverEntry = React.lazy(() => import('../../Discover/DiscoverEntry/DiscoverEntry'));
const Spinner = React.lazy(() => import('../../Spinner/Spinner'));


const FundedProjects = ({ projects, loading }) => {

    const user = useSelector( state => state.auth.user );
    const fundedByMe = projects.filter(project => project.fundedBy.includes( user._id ));
    return (
        <>
            <div className={classes.profileInfo}>
                { !loading ? fundedByMe.map((project) => 
                    <DiscoverEntry key={project._id} project={project} />
                ) : 
                    <Spinner /> }
                
            </div>
            { fundedByMe.length === 0 && <h3 style={{ textAlign: 'center', width: '100%', marginTop: '100px' }}>You have not funded any projects</h3> }

        </>
    );
}

export default FundedProjects;