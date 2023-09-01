import axios from 'axios'
import {React, useEffect, useState} from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

const TakeTest = () => {

    // const [isPending , setIsPending] = useState(true);
    const [userData, setUserData] = useState();
    // const [categ, setCateg] = useState([]);
    const navigate = useNavigate();

    const handleGeneral = () =>{
        navigate('general')
    }

  return (
    <div className='quiz-container'>
            {/* {isPending && <p>Loading...</p>} */}
            {/* {!isPending &&  userData.map(user=>{
                return(
                    <div key={user.id} className='topics-container'>
                        {user.type!=='boolean' && <div key={user.id} className='topic'>{user.category}</div>}
                    </div>
                )
            })} */}
            <Outlet/>
    </div>
  )
}

export default TakeTest