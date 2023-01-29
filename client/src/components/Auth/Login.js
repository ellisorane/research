import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import  { loadUser, login, logout } from '../../features/auth/authSlice'

import classes from './Auth.module.scss';

function Login({ getCurrentUser }) {
//   const user = useSelector( state => state.auth.user )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [ formData, setFormData ] = React.useState({ 
    email: '',
    password: ''
  })

  const [ errorMsg, setErrorMsg ] = React.useState( null )

  const onChangeFormData = ( e ) => setFormData({ ...formData, [ e.target.name ]: e.target.value });

  const { email, password } = formData

  const onSubmitHandler = async( e ) => {
    e.preventDefault();

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify( { email, password } );

    try {
        const res = await axios.post( '/user/login', body, config );
        // const res = await axios.get( '/user/test' );
        
        // Check for form error messages from mongoose validation, if no errors then register and log user in
        if( res.data.error ) {

          setErrorMsg( res.data.error )
          
        } else {

          // console.log( res )
          // console.log( res.data )

          // Reset form
          setFormData({
            email: '',
            password: ''
          });

          // Logout any existing user
          dispatch( logout() )
          // Save user and token data in the redux authSlice
          dispatch( login( res.data ) )
          // Load user
          getCurrentUser()
          // Redirect user to Journal page
          // navigate( '/' )


        }

        // Scroll back to top of page
        window.scrollTo( 0, 0 )
        
    } catch( err ) {
        console.error( err )
    }
  }

  return (
    <div className={ classes.auth }>
        <form className={ classes.authForm } onSubmit={ (e) => onSubmitHandler(e)}>
            <h2 style={{ marginTop: '0', textDecoration: 'underline' }}>Login</h2>

            {/* Error */}
            { errorMsg && <p style={{ color: 'red' }}>{  errorMsg }</p> }

            <label htmlFor='email'>Username/email:</label><br />
            <input type="text" name="email" placeholder="Enter your email" onChange={ (e) => onChangeFormData(e) } required /><br />

            <label htmlFor='password'>Password:</label><br />
            <input type="password" name="password" placeholder="Enter your password" onChange={ (e) => onChangeFormData(e) } required /><br />

            <input type="submit" name="login" value="Log in" /><br />

            <Link to="/signup" style={{ textDecoration: 'underline', color: '#36AB9B' }}>Don't have an account? Signup here.</Link>
        </form>
    </div>
  )
}

export default Login