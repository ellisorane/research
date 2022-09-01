import React, { useState } from 'react';
import axios from 'axios';

import classes from './StartProject.module.scss';

const Success = ({ setFormSubmitted }) => {

    return (
       <div className={classes.successMessage}>
        <h1>PROJECT SUCCESSFULLY CREATED</h1> 
        <button className="sectionBtn" onClick={ () => setFormSubmitted(false) }>SUBMIT ANOTHER</button>
       </div>
    );
}

export default Success;