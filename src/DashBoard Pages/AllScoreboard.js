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

    useEffect(()=>{

        if(localStorage.getItem('token')!==''){
            axios.post("http://localhost:9092/checktoken",{toki: localStorage.getItem('token')}).then(res=>{
                console.log(res.data);
                if(res.data ==='Token invalid'){
                    localStorage.removeItem('token');
                    navigate('/');
                }else{
                    setUser(res.data);
                    axios.get('http://localhost:9092/getscoreboard').then(res=>{
                        console.log('Response from scoreboard: ',res.data);
                        setUsersScoreboard(res.data);
                        if(res.data.length===0){
                            setNoRecords('No records found')
                        }else{
                            setNoRecords('');
                        }
                        setIsPending(false);
                    })
                }
            })
        }
    },[])

    const handleSortName = () =>{
        setIsChanged(true);
        setSortName(prev=>!prev);
        // console.log(sortName);
        const getUsersScores = async() =>{
            // console.log('Type: ',type)
            console.log('Sort Name: ',sortName)
            const response = await axios.post('http://localhost:9092/sortname',{isAsc: sortName});
            console.log('Response from server: ',response.data);
            setSortedUsers(response.data);
        }
        getUsersScores();
    }
    const handleSortEmail = () =>{

        setIsChanged(true);
        setSortEmail(prev=>!prev);
        // console.log(sortName);
        const getUsersScores = async() =>{
            // console.log('Type: ',type)
            console.log('Sort Email: ',sortEmail)
            const response = await axios.post('http://localhost:9092/sortemail',{isAsc: sortEmail});
            console.log('Response from server: ',response.data);
            setSortedUsers(response.data);
        }
        getUsersScores();

    }
    const handleSortScore = () =>{

        setIsChanged(true);
        setSortScore(prev=>!prev);
        // console.log(sortName);
        const getUsersScores = async() =>{
            // console.log('Type: ',type)
            console.log('Sort Score: ',sortScore)
            const response = await axios.post('http://localhost:9092/sortscore',{isAsc: sortScore});
            console.log('Response from server: ',response.data);
            setSortedUsers(response.data);
        }
        getUsersScores();

    }
    const handleSortCategory = () =>{

        setIsChanged(true);
        setSortCategory(prev=>!prev);
        // console.log(sortName);
        const getUsersScores = async() =>{
            // console.log('Type: ',type)
            console.log('Sort Category: ',sortCategory)
            const response = await axios.post('http://localhost:9092/sortcategory',{isAsc: sortCategory});
            console.log('Response from server: ',response.data);
            setSortedUsers(response.data);
        }
        getUsersScores();

    }
    const handleSortDate = () =>{

        setIsChanged(true);
        setSortDate(prev=>!prev);
        // console.log(sortName);
        const getUsersScores = async() =>{
            // console.log('Type: ',type)
            console.log('Sort Date: ',sortCategory)
            const response = await axios.post('http://localhost:9092/sortdate',{isAsc: sortDate});
            console.log('Response from server: ',response.data);
            setSortedUsers(response.data);
        }
        getUsersScores();
    }

  return (
    <div className='scoreboard-container'>
        {isPending && <p>Loading users</p>}
        {!isPending && noRecords.length !== 0 && <p className='no-records-container'>No records found</p>}
        {!isPending && noRecords.length === 0 && <p className='table-description'>Click on <span className='bold'>column name</span> to sort in ascending or descending order</p>}
        {!isPending && noRecords.length === 0 && 
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
                                <td>{usr.name}</td>
                                <td>{usr.email}</td>
                                <td>{usr.score}</td>
                                <td>{usr.category}</td>
                                <td>{usr.date}</td>
                            </tr>
                        )
                    })
                    :
                    sortedUsers.map(usr=>{
                        return(
                            <tr key={usr.id}>
                                <td></td>
                                <td>{usr.name}</td>
                                <td>{usr.email}</td>
                                <td>{usr.score}</td>
                                <td>{usr.category}</td>
                                <td className='date-td'>{usr.date.toString().substring(0,10)}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
            {/* <div className="sort-buttons-container"> */}
                {/* <div className="sort-name"> */}
                    {/* <button onClick={()=>handleSortName()} className='sortButt'>Sort by Name</button> */}
                {/* </div>
                <div className="sort-email"> */}
                    {/* <button onClick={()=>handleSortEmail('email')} className='sortButt'>Sort by Email</button> */}
                {/* </div>
                <div className="sort-score"> */}
                    {/* <button onClick={handleSortScore} className='sortButt'>Sort by Score</button> */}
                {/* </div>
                <div className="sort-category"> */}
                    {/* <button onClick={handleSortCategory} className='sortButt'>Sort by Category</button> */}
                {/* </div>
                <div className="sort-date"> */}
                    {/* <button onClick={handleSortDate} className='sortButt'>Sort by Date</button> */}
                {/* </div> */}
            {/* </div> */}
        </div>
        }
    </div>
  )
}

export default AllScoreboard