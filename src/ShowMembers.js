import {React, useEffect, useState} from 'react'
import axios from 'axios';

const ShowMembers = () => {

    const [users, setUsers] = useState([]);

    useEffect(()=>{
        const fetchUsers = async() =>{
            const response = await axios.get("http://localhost:9092/showmembers")
            setUsers(response.data);
        };
        fetchUsers();
    },[])

  return (
    <div className='showmembers-container'>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user=>{
                    return(
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default ShowMembers