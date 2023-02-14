import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import classes from './StartProject.module.scss';

const Form = React.lazy(() => import('./Form'));
const Success = React.lazy(() => import('./Success'));
const Spinner = React.lazy(() => import('../Spinner/Spinner'))

const StartProject = () => {
    const user = useSelector(state => state.auth.user)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        researchers: user.name,
        institution: user.institution,
        fundingGoal: '',
        daysToFund: 30,
        category: ''
    })

    const { title, description, researchers, institution, fundingGoal, daysToFund, category } = formData;

    const [image, setImage] = useState();

    const [submissionInProgress, setSubmissionInProgress] = useState(false)

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
            setSubmissionInProgress( true )
            window.scrollTo(0, 0);
            
            await axios.post('/projects/addProject', data, config);
            
            setFormData({
                title: '',
                description: '',
                researchers: '',
                institution: '',
                fundingGoal: '',
                daysToFund: 30,
                category: ''
            });
            setSubmissionInProgress( false )
            setFormSubmitted(true);

            data = null
            
        } catch(err) {
            console.error(err);
        }

    }

    return (
       <div className={classes.container}>
        <div className={classes.border}></div>
            { ( !formSubmitted && !submissionInProgress ) && <Form formData={formData} setFormData={setFormData} setImage={setImage} createProject={createProject}  /> }
            { ( formSubmitted && !submissionInProgress ) && <Success setFormSubmitted={setFormSubmitted} /> }
            { ( !formSubmitted && submissionInProgress ) && <Spinner /> }
       </div>
    );
}

export default StartProject;