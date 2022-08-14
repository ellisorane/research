import React from 'react';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';


import classes from './DiscoverEntry.module.scss';

import img from '../../../imgs/fruit research.jpg';
import defUser from '../../../imgs/default.jpg';


const DiscoverEntry = ({ entryId, title, description, researchers, fundingGoal, daysToFund, category, image, date, amountFunded }) => {
    return (
        <Link to={`/entry/${entryId}`} className={classes.DiscEntryContainer}>
            {/* image  */}
            <div style={{ backgroundImage: `url("/uploads/${image}")` }}  className={classes.entryImg}></div>

            <div className={classes.innerContainer}>

                {/* title */}
                <h3>{title}</h3>
                {/* description  */}
                <p className={classes.description}>{description.substring(0, 125)}</p>

                <div className={classes.bottomInfo}>
                    {/* researcher's image | name and institution */}
                    <div className={classes.researcherInfo}>
                        <img src={defUser} alt='img' />
                        <div>
                            <h5><strong>{researchers}</strong></h5> 
                            <p>University of Bologna</p>
                        </div>
                    </div>

                    {/* progress bar for amount funded */}
                    <div className={classes.progressBar}>
                        <div className={classes.progress} style={{ width: `${amountFunded/fundingGoal * 100}%` }}></div>
                    </div>
                    {/* funded percentage | funded goal | days left to get funded  */}
                    <div className={classes.entryFunding}>
                        <div>
                            <h4><NumberFormat value={amountFunded} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h4>
                            <p>funded</p>
                        </div>
                        <div>
                            <h4><NumberFormat value={fundingGoal} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h4>
                            <p>goal</p>
                        </div>
                        <div>
                            <h4>{daysToFund}</h4>
                            <p>days left</p>
                        </div>
                    </div>
                </div>

            </div>
        </Link>
    );
}

export default DiscoverEntry;