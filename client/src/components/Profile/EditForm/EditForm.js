import React from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

import classes from './EditForm.module.scss'

function FormTemplate( props ) {
    const user = useSelector( state => state.auth.user )
    const [ changePassword, setChangePassword ] = React.useState( false )
    const [ showVerifyDelete, setShowVerifyDelete ] = React.useState( false )
    const [ formData, setFormData ] = React.useState( {
        name: user.name,
        institution: user.institution,
        email: user.email,
        password: '',
        newPassword: '',
        confirmPassword: ''
    } )
    const [ errorMsg, setErrorMsg ] = React.useState( null )


    const { name, institution, email, password, newPassword, confirmPassword } = formData

    const openCloseDeleteVerfication = ( e ) => {
        e.preventDefault()
        setShowVerifyDelete( !showVerifyDelete )
    }  

    const editPassword = ( e ) => {
        e.preventDefault()
        setChangePassword( true )
    } 

    const onChangeFormData = ( e ) => setFormData({ ...formData, [ e.target.name ]: e.target.value });

    const updatedUser = async( e ) => {
        e.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify( { name, institution, email, password, newPassword, confirmPassword } );

        try {
            const res = await axios.put( '/user/update-user', body, config );
            // const res = await axios.get( '/user/test' );
            console.log( res )
            
            // Check for form error messages from mongoose validation, if no errors then register and log user in
            if( res.data.error ) {

            setErrorMsg( res.data.error )
            
            } else {

            // console.log( res )
            // console.log( res.data )

            // Reset form
            // setFormData({
            //     email: '',
            //     password: ''
            // });

            // // Logout any existing user
            // dispatch( logout() )
            // // Save user and token data in the redux authSlice
            // dispatch( loginRefresh( res.data ) )
            // // Load user
            // getCurrentUser()
            // Redirect user to Journal page
            // navigate( '/' )


            }

            // Scroll back to top of page
            window.scrollTo( 0, 0 )
            
        } catch( err ) {
            console.error( err )
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
            confirmPassword: ''
        } )
    }, [props.showForm])

  return (
      <form className={ `${ classes.formTemplate } ${ props.showForm ? classes.showForm : undefined }` } onSubmit={ ( e ) => updatedUser( e ) }>
        <h3 style={{ textAlign: 'center' }}>Edit Profile</h3>

        <label htmlFor="name">Name:</label><br />
        <div className={ classes.formGroup }>
            <input type="text" name="name" value={ formData.name } onChange={ ( e ) => onChangeFormData( e ) } /><br /> 
        </div>

        <label htmlFor="institution">Institution:</label><br />
        <div className={ classes.formGroup }>
            <input type="text" name="institution" value={ formData.institution }  onChange={ ( e ) => onChangeFormData( e ) } />
        </div> 

        <label htmlFor="email">Email:</label><br />
        <div className={ classes.formGroup }>
            <input type="email" name="email" value={ formData.email }  onChange={ ( e ) => onChangeFormData( e ) } />
        </div> 

        <label htmlFor="password">Password:</label><br />
        { changePassword ? 
            <>
                <div className={ classes.formGroup }>
                    <input type="password" name="password" value={ formData.password }  onChange={ ( e ) => onChangeFormData( e ) } />
                </div> 
                
                <label htmlFor="password">New Password:</label><br />
                <div className={ classes.formGroup }>
                    <input type="password" name="newPassword" value={ formData.newPassword }  onChange={ ( e ) => onChangeFormData( e ) } /><br />
                </div>    
                <label htmlFor="password">Confirm New Password:</label><br />
                <div className={ classes.formGroup }>
                    <input type="password" name="confirmPassword" value={ formData.confirmPassword }  onChange={ ( e ) => onChangeFormData( e ) } /><br />
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
                    <button>Yes, delete my account.</button>
                    <button onClick={ ( e ) => openCloseDeleteVerfication(e)  }>No, I change my mind.</button>
                </div>
            </div>
        }
    </form>
  )
}

export default FormTemplate