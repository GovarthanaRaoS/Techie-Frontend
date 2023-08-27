import React from 'react'
import { NavLink } from 'react-router-dom'

const MenuList = (props) => {
  return (
    <nav className='menu-list-container'>
        <ul>
            <li><NavLink onClick={()=>props.showMenu(false)} to='/'>Home</NavLink></li>
            <li><NavLink to='/about' onClick={()=>props.showMenu(false)}>About</NavLink></li>
            <li>Services</li>
            <li onClick={()=>props.showMenu(false)}><NavLink to='/contact'>Contact</NavLink></li>
        </ul>
    </nav>
  )
}

export default MenuList