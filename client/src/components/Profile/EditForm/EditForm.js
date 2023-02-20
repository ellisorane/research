import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginRefresh, logout } from '../../../features/auth/authSlice'
import { setStatus, removeStatus } from '../../../features/status/statusSlice'
import axios from 'axios'

import classes from './EditForm.module.scss'

function FormTemplate( props ) {
    const user = useSelector( state => state.auth.user )
    const [ changePassword, setChangePassword ] = React.useState( false )
    const [ showVerifyDelete, setShowVerifyDelete ] = React.useState( false )
    const [ formData, setFormData ] = React.useState({
        name: user.name,
        institution: user.institution,
        email: user.email,
        password: '',
        newPassword: '',
    })
    const [ errorMsg, setErrorMsg ] = React.useState({
        name: null,
        institution: null,
        email: null,
        password: null,
        newPassword: null,
    })
    const dispatch = useDispatch()

    const errorMsgAssigner = ( errs ) => {
        for ( let [key, value] of Object.entries( errs )) {
            setErrorMsg(prevState => ( { ...prevState, [ key ]: value } ))
        }
    }


    const { name, institution, email, password, newPassword, confirmPassword } = formData

    const openCloseDeleteVerfication = ( e ) => {
        e.preventDefault()
        setShowVerifyDelete( !showVerifyDelete )
    }  

    const editPassword = ( e ) => {
        e.preventDefault()
        setChangePassword( true )
    } 

    const onChangeFormData = ( e ) => {

        // Reset Error Messages
        setErrorMsg( { ...errorMsg, [ e.target.name ]: null })
        setFormData({ ...formData, [ e.target.name ]: e.target.value });
    }

    const updatedUser = async( e ) => {
        e.preventDefault();

        // Reset Error Messages
        setErrorMsg( { 
            name: null,
            institution: null,
            email: null,
            password: null,
            newPassword: null,
         })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify( { name, institution, email, password, newPassword, confirmPassword } );

        try {
            
            // Update user
            const res = await axios.put( '/user/update-user', body, config );
            // console.log( res )
            
            // Check for form error messages from mongoose validation, if no errors then register and log user in
            if( res.data.errors ) {
                errorMsgAssigner( res.data.errors)
                // console.log( res.data.errors )
            
            } else {

                // Refresh and update user state 
                dispatch(loginRefresh( res.data ))
                props.getCurrentUser()
                props.setShowForm( false )

                // Status popup
                dispatch( setStatus( 'Profile updated' ) )
                setTimeout( () => dispatch( removeStatus() ), 3000 )
            }

            // Scroll back to top of page
            window.scrollTo( 0, 0 )
            
        } catch( err ) {
            console.error( err )
        }
    }

    const deleteUser = async() => {
        try {

            await axios.delete( '/user/delete' );

            dispatch( logout() )

            // Status popup
            dispatch( setStatus( 'User Deleted' ) )
            setTimeout( () => dispatch( removeStatus() ), 3000 )

        } catch (error) {
            
        }
    }

    // Return form to it's default state when the form is closed
    React.useEffect(() => {
        !props.showForm && setChangePassword( false )
        setFormData( {
            name: user.name,
            institution: user.institution,
            email: user.email,
            password: '',
            newPassword: '',
        } )
    }, [props.showForm])

  return (
      <form className={ `${ classes.formTemplate } ${ props.showForm ? classes.showForm : undefined }` } onSubmit={ ( e ) => updatedUser( e ) }>
        <h3 style={{ textAlign: 'center' }}>Edit Profile</h3>

        {/* Errors */}
        { errorMsg.name && <p style={{ color: 'red' }}>{ errorMsg.name.message }</p> }
        { errorMsg.institution && <p style={{ color: 'red' }}>{ errorMsg.institution.message }</p> }
        { errorMsg.email && <p style={{ color: 'red' }}>{ errorMsg.email.message }</p> }
        { errorMsg.password && <p style={{ color: 'red' }}>{ errorMsg.password.message }</p> }
        { errorMsg.newPassword && <p style={{ color: 'red' }}>{ errorMsg.newPassword.message }</p> }

        <label htmlFor="name">Name:</label><br />
        <div className={ `${classes.formGroup}  ${ errorMsg.name && classes.nameError }` }>
            <input type="text" name="name" value={ formData.name } onChange={ ( e ) => onChangeFormData( e ) } /><br /> 
        </div>

        <label htmlFor="institution">Institution:</label><br />
        <div className={ `${classes.formGroup}  ${ errorMsg.institution && classes.institutionError }` }>
            <input type="text" name="institution" value={ formData.institution }  onChange={ ( e ) => onChangeFormData( e ) } />
        </div> 

        <label htmlFor="email">Email:</label><br />
        <div className={ `${classes.formGroup}  ${ errorMsg.email && classes.emailError }` }>
            <input type="email" name="email" value={ formData.email }  onChange={ ( e ) => onChangeFormData( e ) } />
        </div> 

        <label htmlFor="password">Password:</label><br />
        { changePassword ? 
            <>
                <div className={ `${classes.formGroup}  ${ errorMsg.password && classes.passwordError }` }>
                    <input type="password" name="password" value={ formData.password }  onChange={ ( e ) => onChangeFormData( e ) } />
                </div> 
                
                <label htmlFor="password">New Password:</label><br />
                <div className={ `${classes.formGroup}  ${ errorMsg.newPassword && classes.newPasswordError }` }>
                    <input type="password" name="newPassword" value={ formData.newPassword }  onChange={ ( e ) => onChangeFormData( e ) } /><br />
                </div>    
            </>
            :
            <div className={ classes.formGroup }>
                <input type="password" name="password" value={ formData.password } disabled /><button className={ classes.formBtn } onClick={ (e) => editPassword( e ) }>Change</button><br /> 
            </div>
        }


        

        <input type="submit" value="Submit"></input>
        {
            !showVerifyDelete ?
            <p className={ classes.deleteP } onClick={ ( e ) => openCloseDeleteVerfication(e)  }>Delete my account</p> :
            <div className={ classes.verifyDelete }>
                <h5>Are you sure?</h5>
                <div>
                    <button onClick={ deleteUser }>Yes, delete my account.</button>
                    <button onClick={ ( e ) => openCloseDeleteVerfication(e)  }>No, I change my mind.</button>
                </div>
            </div>
        }
    </form>
  )
}

export default FormTemplate