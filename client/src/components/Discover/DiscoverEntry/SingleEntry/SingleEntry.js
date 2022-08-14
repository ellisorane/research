import React, { useState, useEffect } from "react";
import  { useSelector, useDispatch } from 'react-redux';
import NumberFormat from 'react-number-format';
import { useParams } from 'react-router-dom';
import axios from "axios";

import Payment from "./Payment/Payment";

import { openPayment } from "../../../../features/payment/paymentSlice";
import Spinner from "../../../Spinner/Spinner";

import classes from "./SingleEntry.module.scss";
import parent from "../DiscoverEntry.module.scss";
import discover from "../../Discover.module.scss";

import entryImage from '../../../../imgs/fruit research.jpg';

const SingleEntry = () => {
    // const projects = useSelector(state => state.projects.data[0]);
    const showPayment = useSelector(state => state.payment.value);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [project, setProject] = useState();
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState();

    const returnDate = (project) => {
        let projectCreatedOn;
        let today = new Date();
        projectCreatedOn = new Date(project.date);
        console.log("Created", projectCreatedOn.getTime());
        console.log("Today", today.getTime());
        console.log("Time Difference", today - projectCreatedOn);
        console.log("Day Difference", (today - projectCreatedOn)/(1000 * 60 * 60 *24));
        return projectCreatedOn.toTimeString();
    }
    const getThisProject = async() => {
        try {
            const res = await axios.get(`/projects/${id}`);
            await setProject(res.data);
            setLoading(false);
            // console.log(returnDate(project))
            // return project;
        } catch(err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getThisProject();
    }, []);


    return(
        loading ? <Spinner /> : 
        <div className={classes.singleEntryContainer}>

            <div className={classes.projectHead}>

                <h1 className={classes.entryTitle}>{project.title}</h1>
                <div className={classes.researchers}>
                    <p><strong>Researcher(s):</strong></p>
                    <p><u>{project.researchers}</u></p>
                </div>
                <div className={classes.institution}>
                    <p><strong>Institution:</strong></p>
                    <p><u>Giorgio University</u></p>
                </div>

                <div className={classes.hero}>
                    
                    <div className={classes.imgTagContainer}>
                        <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)), url("/uploads/${project.image}")` }} className={classes.heroImage}></div>
                        <div className={classes.tags}>
                            <div className={classes.tag}>{project.category}</div>
                        </div>
                    </div>
                    


                    <div className={classes.fundingBox}>
                        <Payment showPayment={showPayment} />

                        <div className={classes.pledged}>
                            <h1><NumberFormat value={project.amountFunded} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h1>
                            <p>Pledged</p>
                        </div>

                        <div className={classes.progressBar}>
                        <div className={classes.progress} style={{ width: `${project.amountFunded/project.fundingGoal * 100}%` }}></div>
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
                                <h4 className={classes.fundedRightAlign}>{returnDate(project)}</h4>
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
                                <h4>26</h4>
                                <p>days left</p>
                            </div>
                        </div>

                        <div className={classes.fundBtn} onClick={ () => dispatch(openPayment()) }>Back this Project</div>

                    </div>

                </div>
                
            </div>

            <div className={classes.projectInfo}>
                <div>
                    <h2>About this project</h2>
                    <p>{project.description}</p>
                </div>
            </div>
                
        </div>
    );
}

export default SingleEntry; 

