import React from 'react';
import { FaDna } from 'react-icons/fa';
import { MdOutlineComputer } from 'react-icons/md';
import { GiGears } from 'react-icons/gi';
import { GiHamburgerMenu } from 'react-icons/gi';


import classes from './StartProject.module.scss';

const Form = ({ formData, setFormData, setImage, createProject }) => {
    const onChangeFormData = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const setImgFile = (e) => setImage(e.target.files[0]);
    
    return(
        <form className={classes.startProjForm} onSubmit={(e) => createProject(e)}>
            <h2 className={classes.formHeader}>Start a Project</h2>
            <div className={classes.fields}>
                <label className={classes.labels} htmlFor="title">Title</label><br />
                <input type='text' className="inputs" name="title" value={formData.title} onChange={ (e) => onChangeFormData(e) } /><br />
            </div>

            <div className={classes.fields}>
                <label className={classes.labels} htmlFor="researchers">Researchers</label><br />
                <input type='text' className="inputs" name="researchers" value={formData.researchers} onChange={ (e) => onChangeFormData(e) } /><br />
            </div>

            <div className={classes.fields}>
                <label className={classes.labels} htmlFor="institution">Institution</label><br />
                <input type='text' className="inputs" name="institution" value={formData.institution} onChange={ (e) => onChangeFormData(e) } /><br />
            </div>

            <div className={classes.fields}>
                <label className={classes.labels} htmlFor="category">Category</label><br />
                <div className={`${classes.section} ${classes.categorySection}`}>

                    {/* <div className={`category ${ formData.category === 'biology' && 'active'}`} data-name="category" data-value="biology" onClick={(e) => setFormData({...formData, [e.target.dataset.name]: e.target.dataset.value})}> */}
                    <div className={`category ${ formData.category === 'biology' && 'active'}`} onClick={() => setFormData({...formData, category: 'biology'})}>
                        <span className='biologyIcon'><FaDna /></span>
                        <div className='categoryName'>Biology</div>
                    </div>
                    <div className={`category ${ formData.category === 'technology' && 'active'}`} onClick={(e) => setFormData({...formData, category: 'technology'})}>
                        <span className='technologyIcon'><MdOutlineComputer /></span>
                        <div className='categoryName'>Technology</div>
                    </div>
                    <div className={`category ${ formData.category === 'engineering' && 'active'}`} onClick={(e) => setFormData({...formData, category: 'engineering'})}>
                        <span className='engineeringIcon'><GiGears /></span>
                        <div className='categoryName'>Engineering</div>
                    </div>
                    
                </div>
            </div>

            <div className={classes.fields}>
                <label className={classes.labels} htmlFor="daysToFund">Campaign Duration</label><br />
                <select className="inputs" name="daysToFund" value={formData.daysToFund} onChange={ (e) => onChangeFormData(e) }>
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
                <input type='file' className="inputs" name="image" onChange={ (e) => setImgFile(e) } accept="images/*" /><br />
            </div>

            <div className={classes.fields}>
                <label className={classes.labels} htmlFor="description">About this Project</label><br />
                <textarea className={`inputs ${classes.about}`} rows={10} name="description" value={formData.description} onChange={ (e) => onChangeFormData(e) }></textarea><br />
            </div>
            
            

            <input type="submit" value="Save and Continue" className={`sectionBtn ${classes.submitProject}`} />
        </form>
    );
}

export default Form;