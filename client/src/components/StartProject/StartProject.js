import React, { useState } from 'react';
import { FaDna } from 'react-icons/fa';
import { MdOutlineComputer } from 'react-icons/md';
import { GiGears } from 'react-icons/gi';
import { GiHamburgerMenu } from 'react-icons/gi';


import classes from './StartProject.module.scss';

const StartProject = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        researchers: '',
        fundingGoal: 0,
        category: '',
        tags: [],
        image: ''
    })

    const onChangeFormData = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
       <div className={classes.container}>
        <div className={classes.border}></div>
        <form className={classes.startProjForm}>
            <h2 className={classes.formHeader}>Start a Project</h2>
            <div className={classes.fields}>
                <label className={classes.labels} htmlFor="title">Title</label><br />
                <input type='text' className="inputs" name="name" value={formData.name} onChange={ (e) => onChangeFormData(e) } /><br />
            </div>

            <div className={classes.fields}>
                <label className={classes.labels} htmlFor="researchers">Researchers</label><br />
                <input type='text' className="inputs" name="researchers" value={formData.researchers} onChange={ (e) => onChangeFormData(e) } /><br />
            </div>

            <div className={classes.fields}>
                <label className={classes.labels} htmlFor="category">Category</label><br />
                <div className={`${classes.section} ${classes.categorySection}`}>

                    <div className='category'>
                        <span className='biologyIcon'><FaDna /></span>
                        <div className='categoryName' data-name="category" data-value="biology" onClick={(e) => setFormData({...formData, [e.target.dataset.name]: e.target.dataset.value})}>Biology</div>
                    </div>
                    <div className='category'>
                        <span className='technologyIcon'><MdOutlineComputer /></span>
                        <div className='categoryName' data-name="category" data-value="technology" onClick={(e) => setFormData({...formData, [e.target.dataset.name]: e.target.dataset.value})}>Technology</div>
                    </div>
                    <div className='category'>
                        <span className='engineeringIcon'><GiGears /></span>
                        <div className='categoryName' data-name="category" data-value="engineering" onClick={(e) => setFormData({...formData, [e.target.dataset.name]: e.target.dataset.value})}>Engineering</div>
                    </div>
                    
                </div>
            </div>

            <div className={classes.fields}>
                <label className={classes.labels} htmlFor="daysToFund">Campaign Duration</label><br />
                <select className="inputs" name="daysToFund" onChange={ (e) => onChangeFormData(e) }>
                    <option value="7">7 Days</option>    
                    <option value="14">14 Days</option>    
                    <option value="21">21 Days</option>    
                    <option value="30">30 Days</option>    
                    <option value="45">45 Days</option>    
                </select><br />
            </div>

            <div className={classes.fields}>
                <label className={classes.labels} htmlFor="funding goal">Funding Goal</label><br />
                <div className="fundingGoalWrapper inputs" style={{width: 'fit-content'}}>
                    <div>$</div>
                    <input type='number' name="fundingGoal" value={formData.fundingGoal} min={1} onChange={ (e) => onChangeFormData(e) } /><br />
                </div>
            </div>

            <div className={classes.fields}>
                <label className={classes.labels} htmlFor="image">Project Image</label><br />
                <input type='file' className="inputs" name="image" value={formData.image} onChange={ (e) => onChangeFormData(e) } /><br />
            </div>

            <div className={classes.fields}>
                <label className={classes.labels} htmlFor="description">About this Project</label><br />
                <textarea className={`inputs ${classes.about}`} rows={10} name="description" value={formData.description} onChange={ (e) => onChangeFormData(e) }></textarea><br />
            </div>
            
            

            <input type="submit" value="Save and Continue" className={`sectionBtn ${classes.submitProject}`} />
        </form>
       </div>
    );
}

export default StartProject;