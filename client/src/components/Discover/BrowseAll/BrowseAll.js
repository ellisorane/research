import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { FaDna } from 'react-icons/fa';
import { MdOutlineComputer } from 'react-icons/md';
import { GiGears } from 'react-icons/gi';
import { GiHamburgerMenu } from 'react-icons/gi';

import { setProjects } from '../../../features/projects/projectsSlice';

import DiscoverEntry from '../DiscoverEntry/DiscoverEntry';
import Spinner from '../../Spinner/Spinner';

import parent from '../Discover.module.scss';
import classes from './BrowseAll.module.scss';

import img from '../../../imgs/fruit research.jpg';
import defUser from '../../../imgs/default.jpg';


const BrowseAll = ({ projects, loading, category, setCategory }) => {
    
    const catsegorySelect = (project) => {
        if(category === 'all') {
            return <DiscoverEntry 
            key={project._id} 
            title={project.title} 
            description={project.description} 
            researchers={project.researchers} 
            fundingGoal={project.fundingGoal} 
            daysToFund={project.daysToFund} 
            image={project.image}
            category={project.daysToFund}
            date={project.daysToFund} 
            amountFunded={project.daysToFund} />
        } else {
            if(project.category === category) {
                return <DiscoverEntry 
                key={project._id} 
                title={project.title} 
                description={project.description} 
                researchers={project.researchers} 
                fundingGoal={project.fundingGoal} 
                daysToFund={project.daysToFund} 
                image={project.image}
                category={project.daysToFund}
                date={project.daysToFund} 
                amountFunded={project.daysToFund} />
            } 
        }
    }

    return (
        <div className={classes.browseAllContainer}>
            
            <div className={`${classes.catSection} ${classes.section}`}>

                <div className={`category ${ category === 'all' && 'active'}`} onClick={() => setCategory('all')}>
                    <span className='allCatsIcon'><GiHamburgerMenu /></span>
                    <div className={classes.categoryName}>All Categories</div>
                </div>
                <div className={`category ${ category === 'biology' && 'active'}`} onClick={() => setCategory('biology')}>
                    <span className='biologyIcon'><FaDna /></span>
                    <div className={classes.categoryName}>Biology</div>
                </div>
                <div className={`category ${ category === 'technology' && 'active'}`} onClick={() => setCategory('technology')}>
                    <span className='technologyIcon'><MdOutlineComputer /></span>
                    <div className={classes.categoryName}>Technology</div>
                </div>
                <div className={`category ${ category === 'engineering' && 'active'}`} onClick={() => setCategory('engineering')}>
                    <span className='engineeringIcon'><GiGears /></span>
                    <div className={classes.categoryName}>Engineering</div>
                </div>

            </div>

            <hr className={classes.divider} />
            <h1 style={{ width: 'fit-content', margin: 'auto', textDecoration: 'underline' }}>{category} projects</h1>
            <div className={`${parent.entryContanier} ${classes.section}`}>
                { !loading ? projects.map((item) => catsegorySelect(item)) : <Spinner /> }
            </div>

        </div>
    );
}

export default BrowseAll;