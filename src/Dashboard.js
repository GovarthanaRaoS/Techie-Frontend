import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useNavigate,useHistory, Navigate } from 'react-router-dom';
import Home from './Home';

const Dashboard = () => {

    const [user, setUser] = useState({});
    const navigate = useNavigate();
    // const history = useHistory();

    useEffect(()=>{

        if(localStorage.getItem('token')!=''){
            axios.post("http://localhost:9092/checktoken",{toki: localStorage.getItem('token')}).then(res=>{
                console.log(res.data);
                if(res.data ==='Token invalid'){
                    localStorage.removeItem('token');
                    navigate('/');
                }else{
                    setUser(res.data)
                }
            })
        }
    
        // axios.get("http://localhost:9092/dashboard",{withCredentials: true})
        // .then(res=>{
        //     console.log("Dashboard: ",res.data);
        //     if(res.data === 'No token found'){
        //         localStorage.removeItem('token');
        //         navigate('/');
        //     }else if(res.data){
                
        //         setUser(res.data);
        //     }
        //     else{
        //         navigate('/');
                
        //     }
            
        // });
    },[])

    const handleLogout = () =>{
        const clearSession = async() =>{
            const response = await axios.post("http://localhost:9092/logout",{},{withCredentials: true});
            console.log("Response for logout: ",response.data);
            localStorage.removeItem('token');
            navigate('/home')
        }
        clearSession();
    }

  return (
    <div className="dashboard-container">
        <div className="sidebar-container">
            <p className='user-title'>Welcome {user.name}</p>
            <button onClick={handleLogout} className='logoutButt'>Logout</button>

        </div>
    </div>
  )
}

export default Dashboard