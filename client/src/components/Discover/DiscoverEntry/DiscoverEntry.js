import React from 'react';

import classes from './DiscoverEntry.module.scss';

import img from '../../../imgs/fruit research.jpg';
import defUser from '../../../imgs/default.jpg';


const DiscoverEntry = ({ title, description, researchers, fundingGoal, daysToFund, category, image, date, amountFunded }) => {
    return (
        <div className={classes.DiscEntryContainer}>
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
                        <div className={classes.progress}></div>
                    </div>
                    {/* funded percentage | funded goal | days left to get funded  */}
                    <div className={classes.entryFunding}>
                        <div>
                            <h4>{amountFunded}</h4>
                            <p>funded</p>
                        </div>
                        <div>
                            <h4>${fundingGoal}</h4>
                            <p>goal</p>
                        </div>
                        <div>
                            <h4>{daysToFund}</h4>
                            <p>days left</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default DiscoverEntry;