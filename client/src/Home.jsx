import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Home = () => {
const navigate = useNavigate()
  


  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
    .then(res => {
      if(res.data.status) {
        navigate('/login')
      }
      
    }).catch(err => {
      console.log(err);
    })

  }
  return (
    <div>Home
      <button><Link to='/dashboard'>Dashboard</Link></button>
      <br /><br />
      <button onClick={handleLogout}>Log Out</button>
    </div>
  )
}

export default Home