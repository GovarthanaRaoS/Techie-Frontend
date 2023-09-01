import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import { useNavigate,Outlet, NavLink } from 'react-router-dom';

const DashboardHome = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isPending, setIsPending] = useState(true);
  const [serverError, setServerError] = useState(false);

    useEffect(()=>{

        if(localStorage.getItem('token')!==''){
            axios.post("https://techie-webapp-api.onrender.com/checktoken",{toki: localStorage.getItem('token')}).then(res=>{
                console.log(res.data);
                if(res.data ==='Token invalid'){
                    localStorage.removeItem('token');
                    navigate('/');
                    setIsPending(false);
                }else{
                    setUser(res.data);
                    setIsPending(false);
                }
            }).catch(err=>{
              setIsPending(false);
              setServerError(true);
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

  const handleUsers = () =>{
    navigate('manageusers')
  }

  return (
    <div className="dash-main-container">
      {isPending && <p className='loading-message'>Loading your dashboard. Please wait...</p>}
      {!isPending && serverError && <p className='loading-message'>Sorry our server is down. Please try later...</p>}
            {!isPending && !serverError && <div className="dash-main-cont">
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
                  {(user.role==='moderator' || user.role==='admin') && <div className="card-container"  onClick={handleUsers}>
                      <h2>Manage users</h2>
                      <p>Manage user based on the data. Sort users regards to the score, category and manage users such as deleting their accounts.</p>
                      <button className='takeQuizButt'>Manage users</button>
                  </div>}
              </div>
            </div>}
        </div>
  )
}

export default DashboardHome
