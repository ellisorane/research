import React, { useState, useEffect } from 'react';

import MobilePayment from './MobilePayment';

import classes from './Payment.module.scss';

const Funding = ({ showPayment, setShowPayment }) => { 
    return(
        <div>
            <MobilePayment showPayment={ showPayment } setShowPayment={setShowPayment} />
            <div className={classes.paymentLgScreens}>
                Hello lg screens
            </div>
        </div>
    );
}

export default Funding;