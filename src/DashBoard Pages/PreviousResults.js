import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useNavigate,Outlet, NavLink } from 'react-router-dom';

const PreviousResults = () => {

    const [user, setUser] = useState({});
    const [userData, setUserData] = useState([]);
    const [sno, setSno] = useState(1);
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(true);
    const [serverError, setServerError] = useState(false);

    useEffect(()=>{

        if(localStorage.getItem('token')!==''){
            axios.post("https://techie-webapp-api.onrender.com/checktoken",{toki: localStorage.getItem('token')}).then(res=>{
                console.log(res.data);
                if(res.data ==='Token invalid'){
                    localStorage.removeItem('token');
                    navigate('/');
                }else{
                    // if(res.data.message){
                    //     setErrMsg('No records found');
                    //     return;
                    // }
                    const getResults = async() =>{

                        const response = await axios.post("https://techie-webapp-api.onrender.com/getprevresults",{email: res.data.email});

                        console.log('Retreived results: ',response.data);
                        setUserData(response.data)
                        if(response.data.length===0){
                            setErrMsg('No records found');
                            console.log(errMsg);
                            setIsPending(false);
                        }else{
                            setIsPending(false)
                        }
                    }
                    getResults();

                    }
                })
        }

    },[])

  return (
    <div className='previous-results-container'>

        {isPending && <p className='no-records'>Fetching results</p>}

        {!isPending && serverError && <p className='loading-message'>Sorry our server is down. Please try later...</p>}

        {!isPending && !serverError && userData.length ===0 && <p className='no-records'>No records found</p>}

        {!isPending && !serverError && userData.length !== 0 &&
        <div className='table-container'>
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Category</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                        {userData.map(usr=>{
                            return (
                                <tr key={usr.id}>
                                    <td></td>
                                    <td>{usr.category}</td>
                                    <td>{usr.score}</td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
        }
        {/* {!isPending && errMsg.length>0 && <p className='no-records'>No Records found</p>} */}
    </div>
  )
}

export default PreviousResults
