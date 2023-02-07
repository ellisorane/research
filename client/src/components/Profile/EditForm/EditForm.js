import React from 'react'
import axios from 'axios'

import classes from './EditForm.module.scss'

function FormTemplate( props ) {
    const [ activeField, setActiveField ] = React.useState( null )
    const [ showVerifyDelete, setShowVerifyDelete ] = React.useState( false )
    const [ formData, setFormData ] = React.useState( {
        name: '',
        institution: '',
        password: '',
        newPassword: '',
        confirmPassword: ''
    } )

    const openCloseDeleteVerfication = ( e ) => {
        e.preventDefault()
        setShowVerifyDelete( !showVerifyDelete )
    }  

    const editField = ( e, fieldName ) => {
        e.preventDefault()
        setActiveField( fieldName )
    } 


    const onChangeFormData = ( e ) => setFormData({ ...formData, [ e.target.name ]: e.target.value });


  return (
      <form className={ `${ classes.formTemplate } ${ props.showForm ? classes.showForm : undefined }` }>
        <h3 style={{ textAlign: 'center' }}>Edit Profile</h3>

        <label htmlFor="name">Name:</label><br />
        { activeField === 'name' ? 
            <div className={ classes.formGroup }>
                <input type="text" id="" name="name" value={ formData.name } onChange={ ( e ) => onChangeFormData( e ) } /><br /> 
            </div> :
            <div className={ classes.formGroup }>
                <input type="text" id="" name="name" value={ formData.name } disabled /><button className={ classes.formBtn } onClick={ (e) => editField( e, 'name' ) }>Change</button><br /> 
            </div>
        }

        <label htmlFor="institution">Institution:</label><br />
        { activeField === 'institution' ? 
            <div className={ classes.formGroup }>
                <input type="text" id="" name="institution" value={ formData.institution }  onChange={ ( e ) => onChangeFormData( e ) } />
            </div> :
            <div className={ classes.formGroup }>
                <input type="text" id="" name="institution" value={ formData.institution } disabled /><button className={ classes.formBtn } onClick={ (e) => editField( e, 'institution' ) }>Change</button><br /> 
            </div>
        }

        <label htmlFor="password">Password:</label><br />
        { activeField === 'password' ? 
            <div className={ classes.formGroup }>
                <input type="password" id="" name="password" value={ formData.password }  onChange={ ( e ) => onChangeFormData( e ) } />
            </div> :
            <div className={ classes.formGroup }>
                <input type="password" id="" name="password" value={ formData.password } disabled /><button className={ classes.formBtn } onClick={ (e) => editField( e, 'password' ) }>Change</button><br /> 
            </div>
        }


        {/* Hide confirm password field unless changing password */}
        <label htmlFor="password">New Password:</label><br />
        <div className={ classes.formGroup }>
            <input type="password" id="" name="newPassword" value={ '123456' } disabled /><br />
        </div>    
        <label htmlFor="password">Confirm New Password:</label><br />
        <div className={ classes.formGroup }>
            <input type="password" id="" name="confirmPassword" value={ '123456' } disabled /><br />
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