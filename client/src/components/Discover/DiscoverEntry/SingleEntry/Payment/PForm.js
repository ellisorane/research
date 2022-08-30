import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { closePayment, setNotificationTimer } from '../../../../../features/payment/paymentSlice';

import classes from './Payment.module.scss';

const PForm = ({ project }) => {
    const dispatch = useDispatch(); 
    const [payment, setPayment] = useState({
        name: 'Project Funder',
        cardNumber: '0055 5500 4545 5656',
        expiration: '01/30',
        cvc: '656',
        amount: ''
    });

    const { amount } = payment;
    const { amountFunded, fundedByUser } = project;
    
    const submitPayment = async(e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({ amount, amountFunded, fundedByUser });

        try {
            const res = await axios.post(`/projects/payment/${project._id}`, body, config);
            // console.log(res);
            setPayment({
                name: 'Project Funder',
                cardNumber: '0055 5500 4545 5656',
                expiration: '01/30',
                cvc: '656',
                amount: ''
            });
            dispatch(closePayment());

            dispatch(setNotificationTimer(true));
            setTimeout(() => dispatch(setNotificationTimer(false)), 3500); 

        } catch(err) {
            console.error(err);
        }

    }

    const onChangeHandler = (e) => {
        return setPayment({...payment, [e.target.name]: e.target.value});
    }

    return(
        <form className={classes.paymentForm} onSubmit={(e) => submitPayment(e)}>
            <label htmlFor='amount'>ENTER PLEDGE AMOUNT</label>
            <div className={`${classes.amount} fundingGoalWrapper inputs`} >
                <div><strong>$</strong></div>
                <input type='number' min={1} placeholder="0" name='amount' value={payment.amount} onChange={(e) => onChangeHandler(e)} />
            </div>
            <label>PAYMENT INFORMATION</label><br />
            <div className={classes.fields}>
                <div className={classes.hiddenLabel}>FULL NAME</div>
                <input className={classes.lineInputs} type="text" name="name" value={payment.name} onChange={(e) => onChangeHandler(e)} placeholder='Cardholder name' autoComplete="cc-name" />
            </div>
            <div className={classes.fields}>
                <div className={classes.hiddenLabel}>CARD NUMBER</div>
                <input className={classes.lineInputs} type="tel" name="cardNumber" value={payment.cardNumber} onChange={(e) => onChangeHandler(e)} placeholder='Credit card number' autoComplete="cc-number" />
            </div>
            <div className={classes.cardExpiration}>
                <div className={classes.fields}>
                    <div className={classes.hiddenLabel}>MM/YY</div>
                    <input className={classes.lineInputs} type="text" name="expiration" value={payment.expiration} onChange={(e) => onChangeHandler(e)} placeholder='MM/YY' autoComplete="cc-exp" />
                </div>
                <div className={classes.fields}>
                    <div className={classes.hiddenLabel}>CVC</div>
                    <input className={classes.lineInputs} type="tel" name="cvc" value={payment.cvc} onChange={(e) => onChangeHandler(e)} placeholder='CVC' autoComplete="off" />
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