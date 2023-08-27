import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

const Scoreboard = (props) => {

    const navigate = useNavigate();

    // useEffect(()=>{
    //     if(localStorage.getItem('token')!==''){
    //         axios.post("http://localhost:9092/checktoken",{toki: localStorage.getItem('token')}).then(res=>{
    //             console.log(res.data);
    //             if(res.data ==='Token invalid'){
    //                 localStorage.removeItem('token');
    //                 navigate('/');
    //             }
    //         })
    //     }
    // },[])

    const location = useLocation();

  return (
    <div>
        <h3>Congratulations, you have scored {location.state.score} in {location.state.category}</h3>
        
    </div>
  )
}

export default Scoreboard