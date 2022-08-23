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
        institution: '',
        fundingGoal: '',
        daysToFund: 30,
        category: ''
    })

    const { title, description, researchers, institution, fundingGoal, daysToFund, category } = formData;

    const [image, setImage] = useState();

    const [formSubmitted, setFormSubmitted] = useState(false);

    const createProject = async(e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const formText = JSON.stringify( { title, description, researchers, institution, fundingGoal, daysToFund, category } );
        let data = new FormData();
        data.append('formText', formText);
        data.append('image', image);

        try {
            const res = await axios.post('/projects/addProject', data, config);
            // console.log(res);

            setFormData({
                title: '',
                description: '',
                researchers: '',
                institution: '',
                fundingGoal: '',
                daysToFund: 30,
                category: ''
            });
            setFormSubmitted(true);
            
        } catch(err) {
            console.error(err);
        }

    }

    return (
       <div className={classes.container}>
        <div className={classes.border}></div>
            {!formSubmitted ? <Form formData={formData} setFormData={setFormData} setImage={setImage} createProject={createProject}  /> : <Success setFormSubmitted={setFormSubmitted} />}
       </div>
    );
}

export default StartProject;