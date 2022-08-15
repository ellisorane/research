import React, { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

import classes from './Profile.module.scss';
import user from '../../imgs/default.jpg';

import ProjectsStarted from './ProjectsStarted/ProjectsStarted';
import FundedProjects from './FundedProjects/FundedProfile';

const Profile = ({ projects, loading, getDaysLeft }) => {
    const [activeTab, setActiveTab] = useState(true);
    const [showMore, setShowMore] = useState(false);


    return (
        <div className={classes.profileContainer}>

            <div className={classes.userContainer}>
                <img className={classes.userImg} src={user} alt="user" /> 
                <h2>User Name</h2>
                <div className={classes.profileActionsDiv}>
                    <div className={classes.pActionsBtns}>
                        <div className={classes.pActionsBtn}>Edit Profile</div>
                        <div className={classes.pActionsBtn}>Follow</div>
                    </div>

                    <p className={classes.more} onClick={() => setShowMore(!showMore)}>{!showMore ? 'More ▽' : 'Less △'}</p>
                    { showMore &&
                        <div className={classes.moreDiv}>
                            <hr className={classes.useDivider}></hr>
                            <div><strong>Joined</strong></div>
                            <p>July 2022</p>
                        </div>
                    }
                </div>
            </div>

            <div className={classes.profileInfoContainer}>
                <div className={classes.profileNav}>
                    <div className={`${classes.profileLink} ${activeTab && classes.active}`} onClick={ () => setActiveTab(true) }>Projects Started <span className={classes.count}>0</span></div>
                    <div className={`${classes.profileLink} ${!activeTab && classes.active}`} onClick={ () => setActiveTab(false) }>Backed Projects <span className={classes.count}>0</span></div>
                </div>

                {
                    activeTab ? <ProjectsStarted getDaysLeft={getDaysLeft} projects={projects} loading={loading} /> : <FundedProjects getDaysLeft={getDaysLeft} projects={projects} loading={loading} />
                }

            </div>
        </div>
    );
}

export default Profile;