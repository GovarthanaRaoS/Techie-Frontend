import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const MenuList = (props) => {

  const [backButtonClicked, setbackButtonClicked] = useState(false);
  const navigate = useNavigate();

  const handleEvent = () =>{
    setbackButtonClicked(true);
    navigate('/',{replace: true, state: {showMenu :props.showMenu(false)}});
  }

  useEffect(()=>{
    window.addEventListener('popstate',handleEvent);
    if(backButtonClicked){
      props.showMenu(false);
    }
    return ()=>window.removeEventListener('popstate',handleEvent);
  },[])

  return (
    <nav className='menu-list-container'>
        <ul>
            <li><NavLink onClick={()=>props.showMenu(false)} to='/'>Home</NavLink></li>
            <li><NavLink to='/about' onClick={()=>props.showMenu(false)}>About</NavLink></li>
            <li><NavLink to='/services' onClick={()=>props.showMenu(false)}>Services</NavLink></li>
            <li onClick={()=>props.showMenu(false)}><NavLink to='/contact'>Contact</NavLink></li>
        </ul>
    </nav>
  )
}

export default MenuList