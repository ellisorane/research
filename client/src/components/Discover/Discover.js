import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { FaDna } from 'react-icons/fa';
import { MdOutlineComputer } from 'react-icons/md';
import { GiGears } from 'react-icons/gi';
import { GiHamburgerMenu } from 'react-icons/gi';

import { setProjects } from '../../features/projects/projectsSlice';

// import DiscoverEntry from './DiscoverEntry/DiscoverEntry';
// import Spinner from '../Spinner/Spinner';

import classes from './Discover.module.scss';

import heroImg from '../../imgs/hero.jpg';
import { useEffect } from 'react';

const DiscoverEntry = React.lazy(() => import('./DiscoverEntry/DiscoverEntry'));
const Spinner = React.lazy(() => import('../Spinner/Spinner'));


const Discover = ({ projects, loading, setCategory }) => {
    
    useEffect(() => {
        // getLatestProjects();
        // Reset category to all when the page renders
        setCategory('all');
    }, []);

    return (
        <main>
            <div className={classes.heroContainer}>
                <div className={classes.overlay}>
                    <div className={classes.heroContent}>
                        <div className={classes.heroHeading}><h1>Help fund the next wave of scientific research</h1></div>

                        <div className={classes.heroActions}>
                            <div className={classes.startExperimentBtn}><Link to="/start-project">Start an Experiment</Link></div>
                            <div className={classes.divider}></div>
                            <div className={classes.browseProjectBtn}><Link to="/browse-all">Browse Projects</Link></div>
                        </div>
                    </div>
                </div>
                <div className={classes.hero} style={{backgroundImage: `url(${heroImg})`}}>
                </div>
            </div> 

            <div className={`${classes.section} ${classes.latestSection}`}>
                
                <div className={classes.sectionHeader}>
                    <div>
                        <h2><span className={classes.headerIcon}><AiFillStar /></span>Latest Experiments</h2>
                        <p>Bringing you the freshest daily servings of science.</p>
                    </div>
                    <Link to="browse-all" className={classes.sectionBtn}>See All</Link>
                </div>

                <div className={classes.entryContanier}>

                    { !loading ? projects.map((item) => item.daysLeft >= 0 && <DiscoverEntry key={item._id} project={item} />) : <Spinner /> }

                </div>
            </div>

            <div className={`${classes.section} ${classes.categorySection}`}>

                <div className={classes.sectionHeader}>
                    <h2><span className={classes.headerIcon}><GiHamburgerMenu /></span>Browse by Category</h2>
                </div>

                <Link to="browse-all" className='category' onClick={() => setCategory('biology')}>
                    <span className='biologyIcon'><FaDna /></span>
                    <div className={classes.categoryName}>Biology</div>
                </Link>
                <Link to="browse-all" className='category' onClick={() => setCategory('technology')}>
                    <span className='technologyIcon'><MdOutlineComputer /></span>
                    <div className={classes.categoryName}>Technology</div>
                </Link>
                <Link to="browse-all" className='category' onClick={() => setCategory('engineering')}>
                    <span className='engineeringIcon'><GiGears /></span>
                    <div className={classes.categoryName}>Engineering</div>
                </Link>
                
            </div>
        </main>
    );
}

export default Discover;