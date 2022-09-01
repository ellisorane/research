import React, { useState, useEffect } from 'react';

// import Popup from './Popup';
// import PForm from './PForm';

import classes from './Payment.module.scss';

const Popup = React.lazy(() => import('./Popup'));
const PForm = React.lazy(() => import('./PForm'));

const Payment = ({ project, showPayment, getLatestProjects }) => { 

    return(
        <div>
            <div className={`${classes.payment} ${showPayment ? classes.paymentOpen : classes.paymentClosed}`}>
                <div className={classes.innerContainer}>
                    <Popup showPayment={showPayment} />
                    <PForm getLatestProjects={getLatestProjects} project={project} />
                </div>    
            </div>
        </div>
    );
}

export default Payment;