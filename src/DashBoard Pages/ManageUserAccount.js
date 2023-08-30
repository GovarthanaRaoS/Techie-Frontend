import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import { useNavigate,Outlet, NavLink } from 'react-router-dom';

const ManageUserAccount = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [count, setCount] = useState(0);
    const [currentUser, setCurrentUser] = useState({});
    const [isModerator, setIsModerator] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [changedRole, setChangedRole] = useState('');
    const [filteredUser, setFilteredUser] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [isFetching, setIsFetching] = useState(true);
    
    useEffect(()=>{

        if(localStorage.getItem('token')!==''){
            axios.post("https://techie-webapp-api.onrender.com/checktoken",{toki: localStorage.getItem('token')}).then(res=>{
                console.log(res.data);
                if(res.data ==='Token invalid'){
                    localStorage.removeItem('token');
                    navigate('/');
                }else{
                    setCurrentUser(res.data);
                    setIsAdmin(res.data.role==='admin');
                    setIsModerator(res.data.role==='moderator');

                    const getUsers = async() =>{
                        const response = await axios.get('https://techie-webapp-api.onrender.com/getusers');
                        console.log("Response from Manage user: ",response.data);
                        setUser(response.data);
                        // setFilteredUsers(response.data.filter(uss=>uss.email!==currentUser.email));
                        console.log('Current User Email: ',currentUser.email);
                        setFilteredUser(prev=>response.data.filter(uss=>uss.email!==res.data.email));
                        if(response.data){
                            console.log('Response getting users in ManageUserAccount: ',response.data);
                            setIsFetching(false);
                        }
                    }
                    getUsers();
            
                    const getScoreboard = async() =>{
                        const response = await axios.get('https://techie-webapp-api.onrender.com/getscoreboard');
                        console.log('Response for Scoreboard from Manage user: ',response.data);
                    }
                    getScoreboard();
                    setIsPending(false);

                }
            })
        }
    },[])

    const handleDeleteAccount = (email,role) =>{
        console.log(email,role);
        // if(role==='moderator'){
        //     setIsModerator(true);
        // }else if(role==='admin'){
        //     setIsAdmin(true);
        // }
        if((role==='moderator' || role==='admin') && currentUser.email === email){
            if(window.confirm("Are you sure you want to delete your account?")){
                axios.delete(`https://techie-webapp-api.onrender.com/deleteuser/${email}`,{isModerator: isModerator, isAdmin: isAdmin}).then(res=>{
                    console.log('Delete message: ',res.data);
                    localStorage.removeItem('token');
                    navigate('/');
                });
            }
        }else if((role === 'moderator' || role==='admin') && currentUser.role==='moderator' && currentUser.email !== email){
            window.alert(`You don't have authorization to perform this operation`);
            return;
        }
        // else if(currentUser.role==='moderator' && role === 'admin'){
        //     window.alert(`You don't have authorization to perform this operation`);
        //     return;
        // }
        else if((role==='moderator' || role==='admin') && currentUser.role==='admin'){
            if(window.confirm("Are you sure you want to delete the moderator's account?")){
                axios.delete(`https://techie-webapp-api.onrender.com/deleteuser/${email}`,{isModerator: isModerator, isAdmin: isAdmin}).then(res=>{
                    console.log('Delete message: ',res.data);
                    navigate('/dashboard2/manageusers');
                });
            }
        }
        else if(role==='guest' || role === null){
            axios.delete(`https://techie-webapp-api.onrender.com/deleteuser/${email}`).then(res=>{
                console.log('Delete message: ',res.data);
                if(res.data === "Delete successfully"){
                    navigate('/dashboard2/manageusers');
                }
            });
        }
        else{
            return;
        }

    }

    const handleRoleChange = (id) =>{
        console.log('id: ',id);
        console.log('role: ',changedRole)
    }

    const handleSaveUser = (changingEmail) =>{
        console.log('Changing Email: ',changingEmail);
        console.log('Chosen role',changedRole);
        if(changedRole.length===0){
            return;
        }else{
            axios.post('https://techie-webapp-api.onrender.com/updaterole',{email: changingEmail, role: changedRole})
            .then(res=>{
                console.log('Update response: ',res.data);
                if(res.data==='error'){
                    console.log('Something went wrong while updating the user role');
                }else{
                    navigate('/dashboard2/manageusers')
                }
            })
        }
    }

  return (
    <div className='manage-user-account-container'>
        {isPending && isFetching && <p>Loading users</p>}
        {!isPending && !isFetching && <div className="manage-user-account-subcontainer">
            {(user.length !== 0 ||  (user.length === 1 && user[0].email !== currentUser.email)) && <div className="table-containers">
                <h3>User details</h3>
                <table className='responsive-table'>
                    <thead>
                        <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Roles</th>
                                <th>Action</th>
                                {isAdmin && <th>Change roles</th>}
                                {isAdmin && <th>Save user</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUser.map(usr=>{
                            return (
                                <tr key={usr.id} className='responsive-table-item'>
                                    <td></td>
                                    <td>{usr.name}</td>
                                    <td>{usr.email}</td>
                                    <td>{usr.role}</td>
                                    <td><button className='deleteButt' onClick={()=>handleDeleteAccount(usr.email, usr.role)}>Delete</button></td>
                                    {isAdmin && <td key={usr.id}>
                                                    <select value={changedRole[usr.id]} onChange={(e)=>handleRoleChange(setChangedRole(e.target.value),usr.id)}>
                                                        <option value=''>Role</option>
                                                        <option value='guest'>Guest</option>
                                                        <option value='moderator'>Moderator</option>
                                                        <option value='admin'>Admin</option>
                                                    </select>
                                                </td>}
                                    {isAdmin&& <td><button className='deleteButt' disabled={usr.role==='admin' || usr.role===changedRole} onClick={()=>handleSaveUser(usr.email)}>Save user</button></td>}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>}
        </div>}
        {!isPending && !isFetching && user.length === 1 && user[0].email === currentUser.email && <p className='no-records'>No User found</p>}
    </div>
  )
}

export default ManageUserAccount