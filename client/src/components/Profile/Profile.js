import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { convertDate } from '../../utils/utils';
import  { loadUser, loginRefresh, logout } from '../../features/auth/authSlice'


import classes from './Profile.module.scss';
import defaultUserImg from '../../imgs/default.jpg';

// import ProjectsStarted from './ExpiredProjects/ExpiredProjects';
// import FundedProjects from './FundedProjects/FundedProfile';
const ProjectsStarted = React.lazy(() => import('./ExpiredProjects/ExpiredProjects'));
const FundedProjects = React.lazy(() => import('./FundedProjects/FundedProfile'));
const EditForm = React.lazy(() => import('./EditForm/EditForm'));
const Backdrop = React.lazy(() => import('./Backdrop/Backdrop'));
const Spinner = React.lazy(() => import('../Spinner/Spinner') )

const Profile = ({ projects, loading, getCurrentUser }) => {
    const user = useSelector( state => state.auth.user )
    const [activeTab, setActiveTab] = useState(true);
    const [showMore, setShowMore] = useState(false);
    const  uploadImgInput = React.useRef()
    const [userImg, setUserImg] = useState();
    const dispatch = useDispatch()
    const [ showForm, setShowForm ] = useState( false )


    const changeUserImgFile = (e) => {
        setUserImg(e.target.files[0]);
    }

    const submitUserImg = async(e) => {

        // setImageLoaded(false)
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const data = new FormData();
        data.append( "userImg", userImg );

        try {
            await axios.delete('/user/userImg')
            const res = await axios.put(`/user/userImg`, data, config)

            // Prevents error that occurs when trying to use a newly created AWS signed url too soon after its creation
            setTimeout( () => {
                // Refresh and update user state 
                dispatch(loginRefresh( res.data ))
                getCurrentUser()
            }, 1000 )

        } catch(err) {
            console.log( err )
        }

    }

    // Show default user avatar if the uploaded one cannot be found
    const avatarError = ({currentTarget}) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src = defaultUserImg;
    } 


    // Submit request to change userImg when a file is uploaded
    useEffect(() => {
        userImg && submitUserImg()
    }, [ userImg ])


    return (
        <div className={classes.profileContainer}>

            {
                // Load user profile 
                user ? 
                <div className={classes.userContainer}>
                    {/* Change user avatar */}
                    <div className={ classes.userImgContainer }>
                        
                        <img className={ classes.userImg }
                            onError={(e) => avatarError(e)}
                            src={ user.userImgUrl || defaultUserImg } 
                            alt="User profile pic" 
                        />
                        <button className={ classes.uploadImgBtn } onClick={ () => uploadImgInput.current.click() }>Change</button>
                        <form>
                            <input type='file' className={ classes.uploadImgInput } ref={ uploadImgInput } name='userImg' onChange={ (e) => changeUserImgFile(e) } accept="images/*" />
                        </form>
                    </div>
                    <h2>{ user.name }</h2>
                    <p>{ user.institution }</p>
                    <div className={classes.profileActionsDiv}>
                        <div className={classes.pActionsBtns}>
                            <div className={classes.pActionsBtn} onClick={ () => setShowForm( true ) }>Edit Profile</div>
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
            { showForm && <Backdrop click={ () => setShowForm( false ) } /> }
            <EditForm showForm={ showForm } />
        </div>
    )
}

export default Profile;