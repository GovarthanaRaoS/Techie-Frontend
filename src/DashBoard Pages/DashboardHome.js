import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import { useNavigate,Outlet, NavLink } from 'react-router-dom';

const DashboardHome = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState({});

    useEffect(()=>{

        if(localStorage.getItem('token')!==''){
            axios.post("http://localhost:9092/checktoken",{toki: localStorage.getItem('token')}).then(res=>{
                console.log(res.data);
                if(res.data ==='Token invalid'){
                    localStorage.removeItem('token');
                    navigate('/');
                }else{
                    setUser(res.data);
                }
            })
        }
    },[])

    const handleTest = () =>{
      console.log('clicked')
      navigate('taketest')
  }

  const handlePreviousResults = () =>{
    navigate('previousresults');
  }

  const handleUpdateProfile = () =>{
    navigate('updateprofile')
  }

  return (
    <div className="dash-main-container">
            <h2 className='welcome'>Welcome to your Dashboard, Mr.{user.name}</h2>
            <div className="cards-container">
                <div className="card-container" onClick={handleTest}>
                    <h2>Take test</h2>
                    <p>Test your knowledge and improve your skills by taking the quiz on the following topics.</p>
                    <p>Sports, Politics, Technology, General</p>
                    <button className='takeQuizButt'>Take Quiz</button>
                </div>
                <div className="card-container" onClick={handleUpdateProfile}>
                    <h2>Update Profile</h2>
                    <p>Update your personal details like your name, mobile number and others. Updating your profile helps in your placements and other stuff.</p>
                    <button className='takeQuizButt'>Update Profile</button>
                </div>
                <div className="card-container"  onClick={handlePreviousResults}>
                    <h2>Previous Test Results</h2>
                    <p>Checkout your scores on the previous test you have taken here.</p>
                    <button className='takeQuizButt'>Check results</button>
                </div>
            </div>
        </div>
  )
}

export default DashboardHome