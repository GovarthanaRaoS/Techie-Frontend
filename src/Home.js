import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NavLink } from 'react-router-dom'
import MenuList from './MenuList';
// import axios from 'axios';

const Home = (props) => {
    
    const navigate = useNavigate();
    // const history = useHistory();

    // const {isLogged} = props;
    const [refresh, setRefresh] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    // const [token, setToken] = useState(null);

    useEffect(()=>{
        // axios.get("http://localhost:9092/doesuserexist").then(res=>console.log(res.data));
        if(!refresh){
            setRefresh(true);
        }
        const token = localStorage.getItem('token');
        // setToken(localStorage.getItem('token'));
        console.log("Token exists in Homepage: ",token);
        // console.log(isLogged);
        if(token){
            navigate('/dashboard2');
        }else{
            console.log('Token in HP: ',token);
        }
    },[refresh]);

    // useEffect(()=>{
    //     console.log('show menu: ',showMenu)
    // },[showMenu])

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(()=>{
        window.addEventListener('resize',function(){
            setWindowWidth(window.innerWidth);
        })
    },[])

    useEffect(()=>{
        if(windowWidth>600){
            setShowMenu(false)
        }
    },[windowWidth])

    const handleMenu = () =>{
        setShowMenu(!showMenu);
        console.log(showMenu)
    }

    const toggleMenu = (showMenu) =>{
        setShowMenu(showMenu);
    }

    const handleGreet = () =>{
        axios.get("https://techie-webapp-api.onrender.com/greet").then(res=>console.log(res.data))
    }

    const handleShow = () =>{
        axios.get("https://techie-webapp-api.onrender.com/showmembers").then(res=>console.log(res.data));
    }

  return (
    <div className='homelayout-container'>
        <nav className='navbar-container'>
            <div className='title-logo'>Techie</div>
            <ul className='menu-list'>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li>Services</li>
                {/* <li><NavLink to="/showmembers">Show Members</NavLink></li> */}
                <li><NavLink to='/contact'>Contact us</NavLink></li>
            </ul>
            <div className="nav-butt-container">
                <input type="checkbox" id='check' />
                <label onClick={handleMenu} className='menuButt' htmlFor="check">=</label>
            </div>
        </nav>
        {showMenu?(<MenuList showMenu={toggleMenu}/>):(<main>
            <Outlet/>
        </main>)}
        <footer>
            <p className='copyright'>Copyright &copy;2023. Designed by Govarthana Rao S<button onClick={handleGreet}>Greet</button><button onClick={handleShow}>Show Members</button></p>
        </footer>
    </div>
  )
}

export default Home
