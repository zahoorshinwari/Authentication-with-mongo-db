import React, { useState } from 'react'
import './App.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


const Login = () => {

  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  axios.defaults.withCredentials = true

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3000/auth/login', { 
  
      email,
      password,
    }).then(response => {
      if(response.data.status) {
        
        navigate('/')
      }
      console.log(response.data)
    }).catch(error => {
      console.log(error);
    })
  }
  return (
    <div className='sign-up-container'>
      <form action="" className='signup-form' onSubmit={handleSubmit}>
        <h2>Log In</h2>
        
        <label htmlFor="email">Email:</label>
        <input type="email" placeholder='Email' autoComplete='off'
          onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password">Password:</label>
        <input type="password" placeholder='******'
          onChange={(e) => setPassword(e.target.value)} />

        <button type='submit'>Log In</button>
        <Link to="/forgotPassword">Forgot Password?</Link>
        <p>Don't Have Account? <Link to='/signup'>Sign Up</Link></p>
      </form>
    </div>
  )
}

export default Login 