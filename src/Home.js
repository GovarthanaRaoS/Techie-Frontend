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
    const [isPending, setIsPending] = useState(true);

    // const [token, setToken] = useState(null);

    const [serverErrorMsg, SetServerErrorMsg] = useState(false);

    // const [token, setToken] = useState(null);

    useEffect(()=>{
        // axios.get("http://localhost:9092/doesuserexist").then(res=>console.log(res.data));

            if(!refresh){
                setRefresh(true);
            }
            const token = localStorage.getItem('token');
            // setToken(localStorage.getItem('token'));
            console.log("Token exists in Homepage: ",token);
            axios.post("https://techie-webapp-api.onrender.com/checktoken",{toki: localStorage.getItem('token')})
            .then(res=>{
                // if(res.status === 404){
                //     throw Error('Page not found');
                // }
                    console.log("Res data: ",res.data);
                    console.log('Res status: ',res.status);
                    if(res.data ==='Token invalid'){
                        localStorage.removeItem('token');
                        navigate('/');
                        setIsPending(false);
                    }else{
                        navigate('/dashboard2');
                        setIsPending(false);
                        // setIsLogged(true);
                        // setUser(res.data);
                    }
                }).catch(err=>{
                    SetServerErrorMsg(true);
                    console.log('Caught in error in Home: ',serverErrorMsg);
                    setIsPending(false);
                })

        // console.log(isLogged);
        // if(token){
        //     navigate('/dashboard2');
        // }else{
        //     console.log('Token in HP: ',token);
        // }
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
                <li><NavLink to="/services">Services</NavLink></li>
                {/* <li><NavLink to="/showmembers">Show Members</NavLink></li> */}
                <li><NavLink to='/contact'>Contact us</NavLink></li>
            </ul>
            <div className="nav-butt-container">
                <input type="checkbox" id='check' />
                <label onClick={handleMenu} className='menuButt' htmlFor="check">=</label>
            </div>
        </nav>
        {showMenu?(<MenuList showMenu={toggleMenu}/>):(
        <main>
            {isPending && <p className='loading-message'>Loading...</p>}
            {/* {!isPending && !serverErrorMsg ? <Outlet/> : <p className='loading-message'>Sorry our server is down. Please try later</p>} */}
            {!isPending && !serverErrorMsg  && <Outlet/>}
            {!isPending && serverErrorMsg && <p className='loading-message'>Sorry our server is down. Please try later</p>}
        </main>)}
        <footer>
            <p className='copyright'>Copyright &copy;2023. Designed by <a href="https://govarthan-portfolio.web.app/home">Govarthan</a></p>
        </footer>
    </div>
  )
}

export default Home
