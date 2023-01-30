import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import  { loadUser, loginRefresh, logout } from '../../features/auth/authSlice'

// import logo from '../../../assets/images/logo.png'

import classes from './Auth.module.scss'


function Signup({ getCurrentUser }) {

//   const user = useSelector( state => state.auth.user )
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const [ formData, setFormData ] = React.useState({ 
    email: '',
    name: '',
    institution: '',
    password: ''
  })

  const [ errorMsg, setErrorMsg ] = React.useState([])

  const onChangeFormData = ( e ) => setFormData({ ...formData, [ e.target.name ]: e.target.value });

  const errorHandler = ( errors ) => {
    for( let key in errors ) { 
      console.log(errors[ key ].message)
      setErrorMsg(prevMsg => [ ...prevMsg, errors[key].message ])
    }
  }

  const { email, name, institution, password } = formData

  const onSubmitHandler = async( e ) => {
    e.preventDefault();

    // Clear previous error messages
    setErrorMsg([])

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    
    const body = JSON.stringify( { email, name, institution, password } )
    
    try {
        const res = await axios.post( '/user/signup', body, config )
        
        
        // Check for form error messages from mongoose validation, if no errors then register and log user in
        const errors = res.data.errors
        
        if( errors ) {

          errorHandler( errors )

        } else {

          console.log( res.data )

          // Reset form
        //   setFormData({
        //     email: '',
        //     name: '',
        //     institution: '',
        //     password: ''
        //   });

          // Logout any existing user
          dispatch( logout() )
          // Save user and token data in the redux authSlice
          dispatch( loginRefresh(res.data) )
          // Load user
          getCurrentUser()
          // Redirect user to Journal page
        //   navigate( '/' )

        }

        // Scroll back to top of page
        window.scrollTo( 0, 0 )
        
    } catch( err ) {
        console.error( err )
        console.log('form api call failed')

    }
  }

  return (
    <div className={ classes.auth }>
        <form className={ classes.authForm } onSubmit={ (e) => onSubmitHandler(e) }>
            <h2 style={{ marginTop: '0', textDecoration: 'underline' }}>Signup</h2>

            {/* Error */}
            { errorMsg && errorMsg.map( ( error, index ) => <p key={ index } style={{ color: 'red' }}>{ error }</p> ) }  


            <label htmlFor='email'>Email:</label><br />
            <input type="email" name="email" placeholder="Enter your email" value={ email }onChange={ (e) => onChangeFormData(e) } /><br />

            <label htmlFor='name'>Name:</label><br />
            <input type="text" name="name" placeholder="Enter your name" value={ name }onChange={ (e) => onChangeFormData(e) } /><br />

            <label htmlFor='institution'>Institution (Leave blank if you're a donor):</label><br />
            <input type="text" name="institution" placeholder="Enter your institution" value={ institution }onChange={ (e) => onChangeFormData(e) } /><br />

            <label htmlFor='password'>Password:</label><br />
            <input type="password" name="password" placeholder="Enter your password" value={ password }onChange={ (e) => onChangeFormData(e) } /><br />

            <input type="submit" name="signUp" value="Sign Up" /><br />

            <Link to="/login" style={{ textDecoration: 'underline', color: '#36AB9B' }}>Already have an account? Log In here.</Link>
        </form>
    </div>
  )
}

export default Signup