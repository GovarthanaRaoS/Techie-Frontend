import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import { useNavigate,Outlet, NavLink } from 'react-router-dom';

const ManageUsers = () => {

    const navigate = useNavigate();
  const [user, setUser] = useState({});

    // useEffect(()=>{

    //     const getUsers = async() =>{
    //         const response = await axios.get('http://localhost:9092/getusers');
    //         console.log("Response from Manage user: ",response.data)
    //     }
    //     getUsers();

    //     const getScoreboard = async() =>{
    //         const response = await axios.get('http://localhost:9092/getscoreboard');
    //         console.log('Response for Scoreboard from Manage user: ',response.data);
    //     }
    //     getScoreboard();

    // },[])

    const handleUserAccounts = () =>{
        navigate('manageuseraccount');
    }
    const handleUserScoreboard = () =>{
        navigate('viewscoreboard');
    }

  return (
    <div className='manage-user-container'>
        <div className="cards-container">
            <div className="card-container" onClick={handleUserAccounts}>
                <h2>Manage user account</h2>
                <p>Access user email IDs to respond to them, consult them and promote our products. Manage users and remove unnecessary users</p>
                <button className='takeQuizButt'>Manage user accounts</button>
            </div>
            <div className="card-container" onClick={handleUserScoreboard}>
                <h2>View scoreboard</h2>
                <p>Access the scoreboard and know who is doing better in said category. </p>
                <button className='takeQuizButt'>View Scoreboard</button>
            </div>
        </div>
    </div>
  )
}

export default ManageUsers