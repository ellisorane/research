import React, { useState, useEffect } from 'react';

import PForm from './PForm';

import classes from './Payment.module.scss';

const Popup = (props) => {
    return(
        <div className={`${classes.popup} ${ props.showPayment ? classes.popupOpen : classes.popupClosed }`}>
            <div className={classes.paymentHeading}>
                <h3>Make a Pledge</h3>
                <span className={classes.closeBtn} onClick={ () => props.setShowPayment(false) }>x</span>
            </div>
            <p>Fill out your payment info to recieve updates & results from this experiment.</p>
            <p>If you have any questions, send us an email at support@research.com.</p>
            <p>Secure 2048-bit SSL encrypted</p>
        </div>
    );
}

export default Popup;