import React, { useState, useEffect } from 'react';

import classes from './Payment.module.scss';

const MobilePayment = (props) => { 
    return(
        <div>
            <div className={`${classes.paymentMobileScreens} ${props.showPayment ? classes.paymentMobileScreenOpen : classes.paymentMobileScreenClosed}`}>
                <div className={classes.innerContainer}>
                    <div className={classes.paymentHeading}>
                        <h3>Make a Pledge</h3>
                        <span className={classes.closeBtn} onClick={ () => props.setShowPayment(false) }>x</span>
                    </div>
                    <p>Fill out your payment info to recieve updates & results from this experiment.</p>
                    <p>If you have any questions, send us an email at support@research.com.</p>
                    <p>Secure 2038-bit SSL encrypted</p>

                    <form className={classes.paymentForm}>
                        <label htmlFor='amount'>ENTER PLEDGE AMOUNT</label>
                        <div className={`${classes.amount} fundingGoalWrapper inputs`}>
                            <div><strong>$</strong></div>
                            <input type='number' name="amount" />
                        </div>
                        <label>PAYMENT INFORMATION</label><br />
                        <div className={classes.fields}>
                            <div className={classes.hiddenLabel}>FULL NAME</div>
                            <input className={classes.lineInputs} type="text" name="Name on card" placeholder='Your Full Name' autocomplete="cc-name" />
                        </div>
                        <div className={classes.fields}>
                            <div className={classes.hiddenLabel}>CARD NUMBER</div>
                            <input className={classes.lineInputs} type="tel" name="Card number" placeholder='Credit Card Number' autocomplete="cc-number" />
                        </div>
                        <div className={classes.cardExpiration}>
                            <div className={classes.fields}>
                                <div className={classes.hiddenLabel}>MM/YY</div>
                                <input className={classes.lineInputs} type="text" name="Expiration" placeholder='MM / YY' autocomplete="cc-exp" />
                            </div>
                            <div className={classes.fields}>
                                <div className={classes.hiddenLabel}>CVC</div>
                                <input className={classes.lineInputs} type="tel" name="Cvc" placeholder='CVC' autocomplete="off" />
                            </div>
                        </div>
                        <div className={`${classes.fields} ${classes.anon}`}>
                            <input type='checkbox' name="anonymous" />
                            <label>Back anonymously</label>
                        </div>

                        <input type='submit' value='Back this Project' className={`sectionBtn ${classes.submitPayment}`} />
                        <p className={classes.paymentNote}>Your card won't be charged unless the project is fully funded.</p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MobilePayment;