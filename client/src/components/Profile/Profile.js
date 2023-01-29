import React, { useState } from 'react';
import axios from 'axios';
import { Routes, Route, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { convertDate } from '../../utils/utils';
import { loadUser } from '../../features/auth/authSlice';

import classes from './Profile.module.scss';
import defaultAvatar from '../../imgs/default.jpg';

// import ProjectsStarted from './ExpiredProjects/ExpiredProjects';
// import FundedProjects from './FundedProjects/FundedProfile';
const ProjectsStarted = React.lazy(() => import('./ExpiredProjects/ExpiredProjects'));
const FundedProjects = React.lazy(() => import('./FundedProjects/FundedProfile'));
const Spinner = React.lazy(() => import('../Spinner/Spinner') )

const Profile = ({ projects, loading }) => {
    const user = useSelector( state => state.auth.user )
    const [activeTab, setActiveTab] = useState(true);
    const [showMore, setShowMore] = useState(false);
    const  uploadImgInput = React.useRef()
    const [avatar, setAvatar] = useState();


    // const changeAvFile = (e) => {
    //     setAvatar(e.target.files[0]);
    // }

    const submitAvatar = async(e) => {

        // Set avatar state
        setAvatar(e.target.files[0]);
        console.log('Avatar submitted')


        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const data = new FormData();
        data.append("avatar", avatar);

        try {
            const res = await axios.put(`/user/avatar/${ user._id }`, data, config);
            console.log( res )
            // Load updated user avatar
            loadUser();
        } catch(err) {
            console.log(err);
        }

    }

    return (
        <div className={classes.profileContainer}>

            {
                // Load user profile 
                user ? 
                <div className={classes.userContainer}>
                    {/* Change user avatar */}
                    <div className={ classes.userImgContainer }>
                        <img className={ classes.userImg }
                            src={ user.avatarUrl || defaultAvatar } 
                            alt="User profile pic" 
                        />
                        <button className={ classes.uploadImgBtn } onClick={ () => uploadImgInput.current.click() }>Change</button>
                        <form>
                            <input type='file' className={ classes.uploadImgInput } ref={ uploadImgInput } name='avatar' onChange={ (e) => submitAvatar(e) } accept="images/*" />
                        </form>
                    </div>
                    <h2>{ user.name }</h2>
                    <p>{ user.institution }</p>
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
                                <p>{ convertDate( user.createdAt ) }</p>
                            </div>
                        }
                    </div>
                </div> : <Spinner />
            }

            <div className={classes.profileInfoContainer}>
                <div className={classes.profileNav}>
                    <div className={`${classes.profileLink} ${activeTab && classes.active}`} onClick={ () => setActiveTab(true) }>Backed Projects <span className={classes.count}>{ projects && projects.filter((el) => (el.fundedByUser)).length }</span></div>
                    <div className={`${classes.profileLink} ${!activeTab && classes.active}`} onClick={ () => setActiveTab(false) }>Expired Projects <span className={classes.count}>{ projects && projects.filter((el) => (el.daysLeft < 0)).length }</span></div>
                </div>

                {
                    !activeTab ? <ProjectsStarted projects={projects} loading={loading} /> : <FundedProjects projects={projects} loading={loading} />
                }

            </div>
        </div>
    );
}

export default Profile;