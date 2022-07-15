import React, { useState, useEffect } from 'react';
import  { useDispatch } from 'react-redux';

import { closePayment } from '../../../../../features/payment/paymentSlice';

import PForm from './PForm';

import classes from './Payment.module.scss';

const Popup = ({ showPayment }) => {
    const dispatch = useDispatch();

    return(
        <div className={`${classes.popup} ${ showPayment ? classes.popupOpen : classes.popupClosed }`}>
            <div className={classes.paymentHeading}>
                <h3>Make a Pledge</h3>
                <span className={classes.closeBtn} onClick={ () => dispatch(closePayment()) }>x</span>
            </div>
            <p>Fill out your payment info to recieve updates & results from this experiment.</p>
            <p>If you have any questions, send us an email at support@research.com.</p>
            <p>Secure 2048-bit SSL encrypted</p>
        </div>
    );
}

export default Popup;