import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='not-found-container'>
        <div className="error-container">
            <h3>404 - Page Not Found</h3>
            <p>Sorry we could not find that page. <Link to='/'>Click here to return to the homepage.</Link></p>
        </div>
    </div>
  )
}

export default NotFound