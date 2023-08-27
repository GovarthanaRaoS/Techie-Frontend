import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import homeLayoutStyles from './homeLayoutStyles.css'
import axios from 'axios';

const HomeLayout = (props) => {

    const navigate = useNavigate();
    // const {isLogged} = props;
    const [refresh, setRefresh] = useState(false);

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

  return (
    <div className='homelayout-container'>
            <Outlet/>
    </div>
  )
}

export default HomeLayout