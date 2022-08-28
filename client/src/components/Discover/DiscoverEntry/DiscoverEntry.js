import React, { useEffect } from 'react';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';


import classes from './DiscoverEntry.module.scss';

import img from '../../../imgs/fruit research.jpg';
import defUser from '../../../imgs/default.jpg';


const DiscoverEntry = ({ project }) => {
    
    return (
        <Link to={`/entry/${project._id}`} className={classes.DiscEntryContainer}>
            {/* image  */}
            <div style={{ backgroundImage: `url("/uploads/${project.image}")` }}  className={classes.entryImg}></div>

            <div className={classes.innerContainer}>

                {/* title */}
                <h3>{project.title}</h3>
                {/* description  */}
                <p className={classes.description}>{project.description.substring(0, 125)}</p>

                <div className={classes.bottomInfo}>
                    {/* researcher's image | name and institution */}
                    <div className={classes.researcherInfo}>
                        <img src={defUser} alt='img' />
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