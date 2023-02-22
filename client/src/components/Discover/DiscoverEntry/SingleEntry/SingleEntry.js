import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import  { useSelector, useDispatch } from 'react-redux';
import NumberFormat from 'react-number-format';
import { useParams } from 'react-router-dom';
import axios from "axios";

// import Payment from "./Payment/Payment";
// import Spinner from "../../../Spinner/Spinner";

import { openPayment } from "../../../../features/payment/paymentSlice";
import { setCurrentProject } from "../../../../features/projects/projectsSlice";
import { setStatus, removeStatus } from "../../../../features/status/statusSlice";

import classes from "./SingleEntry.module.scss";
import parent from "../DiscoverEntry.module.scss";
import discover from "../../Discover.module.scss";

import entryImage from '../../../../imgs/fruit research.jpg';

const Payment = React.lazy(() => import("./Payment/Payment"));
const Spinner = React.lazy(() => import("../../../Spinner/Spinner"));

const SingleEntry = ({ setCategory }) => {
    const user = useSelector( state => state.auth.user );
    const showPayment = useSelector(state => state.payment.value);
    const project = useSelector(state => state.projects.currentProject);
    const searchBarSuggested = useSelector(state => state.searchBar.suggested);
    const notificationTimer = useSelector(state => state.payment.notificationTimer);
    const dispatch = useDispatch();
    const { id } = useParams();
    // const [project, setProject] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadThisProject = async() => {
        try {
            const res = await axios.get(`/projects/${id}`);
            await dispatch(setCurrentProject(res.data));
            setLoading(false);
            // console.log('works');
        } catch(err) {
            console.error(err);
        }
    }

    const deleteProject = async() => {
        try {
            await axios.delete(`/projects/${id}`);
            navigate(-1);
             // Status popup
            dispatch( setStatus( 'Project deleted' ) )
            setTimeout( () => dispatch( removeStatus() ), 5000 )
        } catch(err) {
            console.error(err);
        }
    }

    useEffect(() => {
        loadThisProject();
    }, [showPayment, searchBarSuggested]);

    
    return(
        loading ? <div style={{marginTop: '200px'}}><Spinner /></div> : 
        <div className={classes.singleEntryContainer}>

            <div className={classes.projectHead}>

                <h1 className={classes.entryTitle}>{project.title}</h1>
                <div className={classes.researchers}>
                    <p><strong>Researcher(s):</strong></p>
                    {/* <p><Link to="/profile" className={ classes.researchsLink } href="">{project.researchers}</Link></p> */}
                    <p><u>{project.researchers}</u></p>
                </div>
                <div className={classes.institution}>
                    <p><strong>Institution:</strong></p>
                    <p><u>{project.institution}</u></p>
                </div>

                <div className={classes.hero}>
                    
                    <div className={classes.imgTagContainer}>
                        <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)), url("${project.imageURL}")` }} className={classes.heroImage}></div>
                        <div className={classes.tags}>
                            <Link to="/browse-all" onClick={ () => setCategory( project.category ) }><div className={classes.tag}>{project.category}</div></Link>
                            {/* Only show the delete btn if current user created the project */}
                            { ( user && project.user === user._id )  && <div className={`${classes.tag} ${classes.delete}`} onClick={() => deleteProject()}>Delete</div> }
                        </div>
                    </div>
                    


                    {/* Payment column */}
                    <div className={classes.fundingBox}>
                        <Payment project={project} showPayment={showPayment} />

                        <div className={classes.pledged}>
                            <h1><NumberFormat value={project.amountFunded} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h1>
                            <p>Pledged</p>
                        </div>

                        <div className={classes.progressBar}>
                        <div className={classes.progress} style={{ width: `${project.amountFunded/project.fundingGoal * 100}%`, maxWidth: '100%' }}></div>
                        </div>


                        <div className={classes.entryFunding}>
                            <div>
                                <h4>{(project.amountFunded/project.fundingGoal * 100).toFixed(0)}%</h4>
                                <p>Funded</p>
                            </div>
                            <div>
                                <h4><NumberFormat value={project.fundingGoal} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h4>
                                <p>Goal</p>
                            </div>
                            <div>
                                <h4 className={classes.fundedRightAlign}>{project.daysLeft < 0 ? 'Exp' : project.daysLeft}</h4>
                                <p>Days left</p>
                            </div>
                        </div>

                        <div className={classes.entryFundingMobile}>
                            <div>
                                <h4><NumberFormat value={project.amountFunded} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h4>
                                <p>pledged</p>
                            </div>
                            <div className={classes.borderedFunded}>
                                <h4>{(project.amountFunded/project.fundingGoal * 100).toFixed(0)}%</h4>
                                <p>funded</p>
                            </div>
                            <div>
                                <h4>{project.daysLeft < 0 ? 'Exp' : project.daysLeft}</h4>
                                <p>days left</p>
                            </div>
                        </div>

                        {/* If not logged in, payment button redirects to the login page */}
                        { ( !user ) && <Link to="/login"><div className={classes.fundBtn}>Login to fund Project</div></Link> }
                        
                        { ( !notificationTimer && user ) && <div className={classes.fundBtn} onClick={ () => dispatch(openPayment()) }>Back this Project</div> }
                        { notificationTimer && <div className={classes.fundedNotification}>Funds Recieved</div> }

                    </div>

                </div>
                
            </div>

            <div className={classes.projectInfo}>
                <div>
                    <h2>Project Description</h2>
                    <p className={ classes.projectDescription }>{project.description}</p>
                </div>
            </div>
                
        </div>
    );
}

export default SingleEntry; 

