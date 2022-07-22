import React, { useState, useEffect } from 'react';

import classes from './Payment.module.scss';

const PForm = () => { 
    return(
        <form className={classes.paymentForm}>
            <label htmlFor='amount'>ENTER PLEDGE AMOUNT</label>
            <div className={`${classes.amount} fundingGoalWrapper inputs`} >
                <div><strong>$</strong></div>
                <input type='number' min={1} name="amount"  />
            </div>
            <label>PAYMENT INFORMATION</label><br />
            <div className={classes.fields}>
                <div className={classes.hiddenLabel}>FULL NAME</div>
                <input className={classes.lineInputs} type="text" name="Name on card" placeholder='Your Full Name' autoComplete="cc-name" />
            </div>
            <div className={classes.fields}>
                <div className={classes.hiddenLabel}>CARD NUMBER</div>
                <input className={classes.lineInputs} type="tel" name="Card number" placeholder='Credit Card Number' autoComplete="cc-number" />
            </div>
            <div className={classes.cardExpiration}>
                <div className={classes.fields}>
                    <div className={classes.hiddenLabel}>MM/YY</div>
                    <input className={classes.lineInputs} type="text" name="Expiration" placeholder='MM / YY' autoComplete="cc-exp" />
                </div>
                <div className={classes.fields}>
                    <div className={classes.hiddenLabel}>CVC</div>
                    <input className={classes.lineInputs} type="tel" name="Cvc" placeholder='CVC' autoComplete="off" />
                </div>
            </div>
            <div className={`${classes.fields} ${classes.anon}`}>
                <input type='checkbox' name="anonymous" />
                <label>Back anonymously</label>
            </div>

            <input type='submit' value='Back this Project' className={`sectionBtn ${classes.submitPayment}`} />
            <p className={classes.paymentNote}>Your card won't be charged unless the project is fully funded.</p>
        </form>
              
    );
}

export default PForm;