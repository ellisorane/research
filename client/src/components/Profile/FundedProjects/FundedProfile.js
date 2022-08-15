import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from '../Profile.module.scss';
import user from '../../../imgs/default.jpg';

import DiscoverEntry from '../../Discover/DiscoverEntry/DiscoverEntry';
import Spinner from '../../Spinner/Spinner';



const FundedProjects = ({ projects, loading, getDaysLeft }) => {
    return (
        <div className={classes.profileInfo}>
            { !loading ? projects.map((item, index) => 
                <DiscoverEntry 
                key={item._id} 
                entryId={item._id}
                title={item.title} 
                description={item.description} 
                researchers={item.researchers} 
                fundingGoal={item.fundingGoal} 
                daysToFund={item.daysToFund} 
                image={item.image}
                category={item.daysToFund}
                date={item.date} 
                amountFunded={item.amountFunded}
                getDaysLeft={getDaysLeft} />
            ) : 
            <Spinner /> }
            
        </div>
    );
}

export default FundedProjects;