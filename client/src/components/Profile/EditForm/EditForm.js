import React from 'react'

import classes from './EditForm.module.scss'

function FormTemplate( props ) {
  const [ showVerifyDelete, setShowVerifyDelete ] = React.useState( false )
  const openCloseDeleteVerfication = ( e ) => {
        e.preventDefault()
        setShowVerifyDelete( !showVerifyDelete )
    }  

  return (
      <form className={ `${ classes.formTemplate } ${ props.showForm ? classes.showForm : undefined }` }>
        <h3 style={{ textAlign: 'center' }}>Edit Profile</h3>
        <label htmlFor="name">Name:</label><br />
        <div className={ classes.formGroup }>
            <input type="text" id="" name="name" value={ 'jSmith' } disabled /><button className={ classes.formBtn }>Change</button><br />
        </div>
        <label htmlFor="institution">Institution:</label><br />
        <div className={ classes.formGroup }>
            <input type="text" id="" name="institution" value={ 'Test Institute' } disabled /><button className={ classes.formBtn }>Change</button><br />
        </div>
        <label htmlFor="password">Password:</label><br />
        <div className={ classes.formGroup }>
            <input type="password" id="" name="password" value={ '123456' } disabled /><button className={ classes.formBtn }>Change</button><br />
        </div>
        {/* Hide confirm password field unless changing password */}
        <label htmlFor="password">New Password:</label><br />
        <div className={ classes.formGroup }>
            <input type="confirm" id="" name="confirm-password" value={ '123456' } disabled /><br />
        </div>    
        <label htmlFor="password">Confirm New Password:</label><br />
        <div className={ classes.formGroup }>
            <input type="confirm" id="" name="confirm-password" value={ '123456' } disabled /><br />
        </div>    

        <input type="submit" value="Submit"></input>
        {
            !showVerifyDelete ?
            <p className={ classes.deleteP } onClick={ ( e ) => openCloseDeleteVerfication(e)  }>Delete my account</p> :
            <div className={ classes.verifyDelete }>
                <h5>Are you sure?</h5>
                <div>
                    <button>Yes, delete my account.</button>
                    <button onClick={ ( e ) => openCloseDeleteVerfication(e)  }>No, I change my mind.</button>
                </div>
            </div>
        }
    </form>
  )
}

export default FormTemplate