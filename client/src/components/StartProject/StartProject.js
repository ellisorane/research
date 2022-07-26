import React, { useState } from 'react';
import axios from 'axios';

import Form from './Form';
import Success from './Success';

import classes from './StartProject.module.scss';

const StartProject = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        researchers: '',
        fundingGoal: 0,
        daysToFund: 30,
        category: '',
        image: ''
    })

    const [formSubmitted, setFormSubmitted] = useState(false);

    const createProject = async(e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({ formData });

        try {
            // const res = await axios.post('/projects/addProject', body, config);
            // console.log(res);
            console.log('Success');
            setFormSubmitted(true);
        } catch(err) {
            console.error(err);
        }

        
    }

    return (
       <div className={classes.container}>
        <div className={classes.border}></div>
            {!formSubmitted ? <Form formData={formData} setFormData={setFormData}  createProject={createProject}  /> : <Success />}
       </div>
    );
}

export default StartProject;