import React, { useState, useEffect } from 'react';

import Popup from './Popup';
import PForm from './PForm';

import classes from './Payment.module.scss';

const Payment = ({ project, showPayment }) => { 

    return(
        <div>
            <div className={`${classes.payment} ${showPayment ? classes.paymentOpen : classes.paymentClosed}`}>
                <div className={classes.innerContainer}>
                    <Popup showPayment={showPayment} />
                    <PForm project={project} />
                </div>    
            </div>
        </div>
    );
}

export default Payment;