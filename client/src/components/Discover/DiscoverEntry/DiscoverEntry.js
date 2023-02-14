import React, { useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import axios from 'axios';

import classes from './DiscoverEntry.module.scss';

import defUser from '../../../imgs/default.jpg';


const DiscoverEntry = ({ project }) => {
    const [ userImgUrl, setUserImgUrl ] = useState()

    // userImgUrl for each project
    const getUserImgUrl = async() => {
        try {
            const res = await axios.get( `/user/userImgUrl/${project.user}` );
            if (res.data) {
                // console.log( res )
                setUserImgUrl( res.data.userImgUrl )
            }
        } catch(err) {
            console.error(err);
        }
    } 

    useEffect( () => {
        getUserImgUrl()
    }, [] )
    
    return (
        <Link to={`/entry/${project._id}`} className={classes.DiscEntryContainer}>
            {/* image  */}
            <div style={{ backgroundImage: `url("${project.imageURL === undefined ? "Fail" : project.imageURL }")` }}  className={classes.entryImg}></div>

            <div className={classes.innerContainer}>

                {/* title */}
                <h4>{project.title}</h4>
                {/* description  */}
                <p className={classes.description}>{project.description.substring(0, 100)}</p>

                <div className={classes.bottomInfo}>
                    {/* researcher's image | name and institution */}
                    <div className={classes.researcherInfo}>
                        <img src={ userImgUrl || defUser} alt='img' />
                        {/* <img src={ defUser } alt='img' /> */}
                        <div>
                            <h5><strong>{project.researchers}</strong></h5> 
                            <p>{project.institution}</p>
                        </div>
                    </div>

                    {/* progress bar for amount funded */}
                    <div className={classes.progressBar}>
                        <div className={classes.progress} style={{ width: `${project.amountFunded/project.fundingGoal * 100}%`, maxWidth: '100%' }}></div>
                    </div>
                    {/* funded percentage | funded goal | days left to get funded  */}
                    <div className={classes.entryFunding}>
                        <div>
                            <h4><NumberFormat value={project.amountFunded} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h4>
                            <p>funded</p>
                        </div>
                        <div>
                            <h4><NumberFormat value={project.fundingGoal} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h4>
                            <p>goal</p>
                        </div>
                        <div>
                            <h4>{project.daysLeft < 0 ? 'Exp' : project.daysLeft}</h4>
                            <p>days left</p>
                        </div>
                    </div>
                </div>

            </div>
        </Link>
    );
}

export default DiscoverEntry;