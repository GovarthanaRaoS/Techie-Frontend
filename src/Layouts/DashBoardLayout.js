import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useNavigate,Outlet, NavLink } from 'react-router-dom';
import { Route } from "react-router-dom";
import DashboardHome from '../DashBoard Pages/DashboardHome';
import './dashboardStyles.css';

const DashBoardLayout = () => {

    const navigate = useNavigate();
    const [isDashboard, setIsDashBoard] = useState(false);
    const [isLogged, setIsLogged] = useState(false);

    const [user, setUser] = useState({});

    useEffect(()=>{

        if(localStorage.getItem('token')!==''){
            axios.post("http://localhost:9092/checktoken",{toki: localStorage.getItem('token')}).then(res=>{
                console.log(res.data);
                if(res.data ==='Token invalid'){
                    localStorage.removeItem('token');
                    navigate('/');
                }else{
                    setIsLogged(true);
                    setUser(res.data);
                }
            })
        }
    },[])

    const handleLogout = () =>{
        const clearSession = async() =>{
            setIsLogged(false);
            const response = await axios.post("http://localhost:9092/logout",{},{withCredentials: true});
            console.log("Response for logout: ",response.data);
            localStorage.removeItem('token');
            navigate('/')
        }
        clearSession();
    }

  return (
    <div className='dashboard-container'>
        <header className='dash-header-container'>
            <h2 className='title-logo'>Techie</h2>
            <button className='logoutButt' onClick={handleLogout}>Logout</button>
        </header>
        <main>
            <Outlet/>
        </main>
        <footer>
            <p className='copyright'>Copyright &copy;2023</p>
        </footer>
    </div>
  )
}

export default DashBoardLayout