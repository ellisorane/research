import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { FaDna } from 'react-icons/fa';
import { MdOutlineComputer } from 'react-icons/md';
import { GiGears } from 'react-icons/gi';
import { GiHamburgerMenu } from 'react-icons/gi';

import DiscoverEntry from '../DiscoverEntry/DiscoverEntry';

import parent from '../Discover.module.scss';
import classes from './BrowseAll.module.scss';

import img from '../../../imgs/fruit research.jpg';
import defUser from '../../../imgs/default.jpg';


const BrowseAll = () => {
    return (
        <div className={classes.browseAllContainer}>
            
            <div className={`${classes.catSection} ${classes.section}`}>

                <div className='category active'>
                    <span className='allCatsIcon'><GiHamburgerMenu /></span>
                    <div className={classes.categoryName}>All Categories</div>
                </div>
                <div className='category'>
                    <span className='biologyIcon'><FaDna /></span>
                    <div className={classes.categoryName}>Biology</div>
                </div>
                <div className='category'>
                    <span className='technologyIcon'><MdOutlineComputer /></span>
                    <div className={classes.categoryName}>Technology</div>
                </div>
                <div className='category'>
                    <span className='engineeringIcon'><GiGears /></span>
                    <div className={classes.categoryName}>Engineering</div>
                </div>

            </div>

            <hr className={classes.divider} />

            <div className={`${parent.entryContanier} ${classes.section}`}>
                <Link to="/entry"><DiscoverEntry /></Link>
                <DiscoverEntry />
                <DiscoverEntry />
                <DiscoverEntry />
                <DiscoverEntry />
                <DiscoverEntry />
                <DiscoverEntry />
                <DiscoverEntry />
                <DiscoverEntry />
                <DiscoverEntry />
            </div>

        </div>
    );
}

export default BrowseAll;