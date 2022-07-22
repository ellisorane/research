import React from 'react';

import classes from './DiscoverEntry.module.scss';

import img from '../../../imgs/fruit research.jpg';
import defUser from '../../../imgs/default.jpg';


const DiscoverEntry = () => {
    return (
        <div className={classes.DiscEntryContainer}>
            {/* image  */}
            <img src={img} className={classes.entryImg} alt='img' />

            <div className={classes.innerContainer}>

                {/* title */}
                <h3>Create a fruit/vegetable that could replace meat</h3>
                {/* description  */}
                <p>Our aim is to produce a fruit/vegetable that can replace meat. We plan to do this by crossbreeding a variety of fruits and vegetables until we can get it right</p>
                {/* researcher's image | name and institution */}
                <div className={classes.researcherInfo}>
                <img src={defUser} alt='img' />
                    <div>
                        <h5><strong>Giorgio Blastawind</strong></h5> 
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
                        <h4>45%</h4>
                        <p>funded</p>
                    </div>
                    <div>
                        <h4>$38000</h4>
                        <p>goal</p>
                    </div>
                    <div>
                        <h4>26</h4>
                        <p>days left</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DiscoverEntry;