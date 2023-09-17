import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import { useNavigate,Outlet, NavLink } from 'react-router-dom';

const AllScoreboard = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [usersScoreboard, setUsersScoreboard] = useState([]);
    const [noRecords, setNoRecords] = useState('');
    const [isPending, setIsPending] = useState(true);
    const [sortName, setSortName] = useState(true);
    const [sortEmail, setSortEmail] = useState(true);
    const [sortScore, setSortScore] = useState(true);
    const [sortCategory, setSortCategory] = useState(true);
    const [sortDate, setSortDate] = useState(true);
    const [isChanged, setIsChanged] = useState(false);
    const [sortedUsers, setSortedUsers] = useState([]);
    const [width, setInnerWidth] = useState(window.innerWidth);
    const [isFetching, setIsFetching] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [errMsg, setErrMsg] = useState('');

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
                    axios.get('https://techie-webapp-api.onrender.com/getscoreboard').then(res=>{
                        console.log('Response from scoreboard: ',res.data);
                        setUsersScoreboard(res.data);
                        // if(res.data[0].message === 'error'){
                        //     console.log('Received Error: ',res.data[0].message);
                        //     setErrMsg('Cannot connect to database')
                        //     setIsPending(false);
                        //     return;
                        // }
                        if(res.data.length===0){
                            setIsPending(false);
                            setNoRecords('No records found')
                        }else{
                            setIsPending(false);
                            setNoRecords('');
                        }
                        setIsPending(false);
                    }).catch(errr=>{
                        setIsPending(false);
                        setServerError(true);
                        console.log('Error up', errr)
                    })
                }
            }).catch(err=>{
                setIsPending(false);
                setServerError(true);
                console.log('Error down', err)
            })
        }
    },[])

    useEffect(()=>{
        window.addEventListener('resize',function(){
            setInnerWidth(window.innerWidth);
            console.log("Innerwidth: ",width)
        })
    },[])

    const handleSortName = () =>{
        setIsFetching(true);
        setIsChanged(true);
        setSortName(prev=>!prev);
        // console.log(sortName);
        const getUsersScores = async() =>{
            // console.log('Type: ',type)
            console.log('Sort Name: ',sortName)
            const response = await axios.post('https://techie-webapp-api.onrender.com/sortname',{isAsc: sortName});
            console.log('Response from server: ',response.data);
            setSortedUsers(response.data);
            setIsFetching(false);
        }
        getUsersScores();
    }
    const handleSortEmail = () =>{
        setIsFetching(true);
        setIsChanged(true);
        setSortEmail(prev=>!prev);
        // console.log(sortName);
        const getUsersScores = async() =>{
            // console.log('Type: ',type)
            console.log('Sort Email: ',sortEmail)
            const response = await axios.post('https://techie-webapp-api.onrender.com/sortemail',{isAsc: sortEmail});
            console.log('Response from server: ',response.data);
            setSortedUsers(response.data);
            setIsFetching(false);
        }
        getUsersScores();

    }
    const handleSortScore = () =>{
        setIsFetching(true);
        setIsChanged(true);
        setSortScore(prev=>!prev);
        // console.log(sortName);
        const getUsersScores = async() =>{
            // console.log('Type: ',type)
            console.log('Sort Score: ',sortScore)
            const response = await axios.post('https://techie-webapp-api.onrender.com/sortscore',{isAsc: sortScore});
            console.log('Response from server: ',response.data);
            setSortedUsers(response.data);
            setIsFetching(false);
        }
        getUsersScores();

    }
    const handleSortCategory = () =>{
        setIsFetching(true);
        setIsChanged(true);
        setSortCategory(prev=>!prev);
        // console.log(sortName);
        const getUsersScores = async() =>{
            // console.log('Type: ',type)
            console.log('Sort Category: ',sortCategory)
            const response = await axios.post('https://techie-webapp-api.onrender.com/sortcategory',{isAsc: sortCategory});
            console.log('Response from server: ',response.data);
            setSortedUsers(response.data);
            setIsFetching(false);
        }
        getUsersScores();

    }
    const handleSortDate = () =>{
        setIsFetching(true);
        setIsChanged(true);
        setSortDate(prev=>!prev);
        // console.log(sortName);
        const getUsersScores = async() =>{
            // console.log('Type: ',type)
            console.log('Sort Date: ',sortCategory)
            const response = await axios.post('https://techie-webapp-api.onrender.com/sortdate',{isAsc: sortDate});
            console.log('Response from server: ',response.data);
            setSortedUsers(response.data);
            setIsFetching(false);
        }
        getUsersScores();
    }

  return (
    <div className='scoreboard-container'>
        {isPending && <p className='loading-message'>Loading users</p>}
        {!isPending && serverError && <p className='loading-message'>Sorry our server is down. Please try later...</p>}
        {!isPending && !serverError && errMsg.length!==0 && <p className='loading-message'>Cannot connect to database. Please try later or restart the server...</p>}
        {!isPending && !serverError && errMsg.length===0  && noRecords.length !== 0 && <p className='no-records'>No records found</p>}
        {!isPending && !serverError && errMsg.length===0  && isFetching && <p className='loading-message'>Fetching users</p>}
        {!isPending && !serverError && errMsg.length===0  && !isFetching && noRecords.length === 0 && <p className='table-description'>Click on <span className='bold'>column name</span> to sort in ascending or descending order</p>}
        {!isPending && !serverError && errMsg.length===0 && noRecords.length === 0 && !isFetching &&
        <div className='user-scoreboard-container'>
            <table className='scoreboard-table-container'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th onClick={handleSortName}>Name</th>
                        <th onClick={handleSortEmail}>Email</th>
                        <th onClick={handleSortScore}>Score</th>
                        <th onClick={handleSortCategory}>Category</th>
                        <th onClick={handleSortDate}>date</th>
                    </tr>
                </thead>
                <tbody>
                    {!isChanged ? usersScoreboard.map(usr=>{
                        return(
                            <tr key={usr.id}>
                                <td></td>
                                <td data-cell="name">{usr.name}</td>
                                <td data-cell="email">{usr.email}</td>
                                <td data-cell="score">{usr.score}</td>
                                <td data-cell="category">{usr.category}</td>
                                <td data-cell="date">{usr.date.toString().substring(0,10)}</td>
                            </tr>
                        )
                    })
                    :
                    sortedUsers.map(usr=>{
                        return(
                            <tr key={usr.id}>
                                <td></td>
                                <td data-cell="name">{usr.name}</td>
                                <td data-cell="email">{usr.email}</td>
                                <td data-cell="score">{usr.score}</td>
                                <td data-cell="category">{usr.category}</td>
                                <td data-cell="date" className='date-td'>{usr.date.toString().substring(0,10)}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
            {width<801 && <div className="sort-buttons-container">
                {/* <div className="sort-name"> */}
                    <button onClick={handleSortName} className='sortButt'>Sort by Name</button>
                {/* </div> */}
                {/* <div className="sort-email"> */}
                    <button onClick={handleSortEmail} className='sortButt'>Sort by Email</button>
                {/* </div> */}
                    {/* <div className="sort-score"> */}
                    <button onClick={handleSortScore} className='sortButt'>Sort by Score</button>
                {/* </div> */}
                    {/* <div className="sort-category"> */}
                    <button onClick={handleSortCategory} className='sortButt'>Sort by Category</button>
                {/* </div> */}
                {/* <div className="sort-date"> */}
                    <button onClick={handleSortDate} className='sortButt'>Sort by Date</button>
                {/* </div> */}
            </div>}
        </div>
        }
    </div>
  )
}

export default AllScoreboard