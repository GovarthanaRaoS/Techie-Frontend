import React, { useRef } from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import { useNavigate,Outlet, NavLink } from 'react-router-dom';

const ManageUserAccount = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [isModerator, setIsModerator] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [changedRole, setChangedRole] = useState('');
    const [filteredUser, setFilteredUser] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [isFetching, setIsFetching] = useState(true);
    const [errMsg, setErrMsg] = useState('');
    const [serverError, setServerError] = useState(false);
    const [refresh, setRefresh] = useState(false);
    
    useEffect(()=>{

        if(localStorage.getItem('token')!==''){
            
            axios.post("https://techie-webapp-api.onrender.com/checktoken",{toki: localStorage.getItem('token')}).then(res=>{
                console.log("Response from useEffect for Manage users: ",res.data);
                if(res.data ==='Token invalid'){
                    localStorage.removeItem('token');
                    navigate('/');
                    setIsPending(false);
                }else{
                    const currUsr = res.data;
                    setCurrentUser(currUsr);
                    setIsAdmin(res.data.role==='admin');
                    setIsModerator(res.data.role==='moderator');

                        const getUsers = async() =>{
                            setIsFetching(true);
                            const response = await axios.get('https://techie-webapp-api.onrender.com/getusers');
                            console.log("Response from Manage user: ",response.data);
                            if(response.data[0].message === 'error'){
                                console.log('Received Error from Database: ',response.data[0].message);
                                setErrMsg('Cannot connect to database. Please try later or restart the server...');
                                setIsPending(false);
                                setIsFetching(false);
                                return;
                            }
                            if(response.data){
                                setUser(response.data);
                                // setFilteredUsers(response.data.filter(uss=>uss.email!==currentUser.email));
                                console.log('Current User Email: ',res.data.email);
                                console.log('Current User Email from state: ',currentUser.email);
                                setFilteredUser(response.data.filter(uss=>uss.email!==res.data.email));
                                console.log('Response getting users in ManageUserAccount: ',response.data);
                                console.log('Filtered Users: ',filteredUser)
                                setIsFetching(false);
                                setIsPending(false);
                            }
                        }

                        getUsers();
            
                    // const getScoreboard = async() =>{
                    //     const response = await axios.get('http://localhost:9092/getscoreboard');
                    //     console.log('Response for Scoreboard from Manage user: ',response.data);
                    // }

                    // getScoreboard();
                    setIsPending(false);

                }
            }).catch(err=>{
                setIsPending(false);
                setServerError(true);
            })
        }
    },[refresh]);

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
            if(window.confirm(`Are you sure you want to delete the ${role}'s account?`)){
                setIsFetching(true)
                axios.delete(`https://techie-webapp-api.onrender.com/deleteuser/${email}`,{isModerator: isModerator, isAdmin: isAdmin}).then(res=>{
                    console.log('Delete message: ',res.data);
                    // navigate('/dashboard2/manageusers');
                    setIsFetching(true);
                    setRefresh(!refresh);
                });
            }
        }
        else if(role==='guest' || role === null){
            if(window.confirm('Are you sure you want to delete this account?')){
                setIsFetching(true)
                axios.delete(`https://techie-webapp-api.onrender.com/deleteuser/${email}`).then(res=>{
                    console.log('Delete message: ',res.data);
                    if(res.data === "Delete successfully"){
                        // navigate('/dashboard2/manageusers');
                        setRefresh(!refresh);
                    }else{
                        setIsFetching(false);
                    }
                })
            }else{
                return;
            }
        }
        else{
            return;
        }

    }

    const handleRoleChange = (id) =>{
        console.log('id: ',id);
        console.log('role: ',changedRole)
    }

    const handleSaveUser = (changingEmail, changingName, old_role) =>{
        console.log('Changing Email: ',changingEmail);
        console.log('Chosen role',changedRole);
        if(changedRole.length===0){
            window.alert('Please choose a role');
            return;
        }else if(old_role === changedRole){
            window.alert('User already has the same access level')
        }
        else{

            if(window.confirm(`Are you sure you want to change the role of ${changingName} from ${old_role} to ${changedRole}?`)){
                setIsFetching(true);
                axios.post('https://techie-webapp-api.onrender.com/updaterole',{email: changingEmail, role: changedRole})
                .then(res=>{
                    console.log('Update response: ',res.data);
                    if(res.data==='error'){
                        console.log('Something went wrong while updating the user role');
                    }else{
                        // navigate('/dashboard2/manageusers')
                        setRefresh(!refresh);
                    }
                })
            }else{
                return;
            }

        }
    }

  return (
    <div className='manage-user-account-container'>
        {(isPending || isFetching) && !serverError && <p className='no-records'>Loading users</p>}
        {!isPending && serverError && <p className='loading-message'>Sorry our server is down. Please try later...</p>}
        {!isPending && !serverError && errMsg.length>0 && <p className='loading-message'>Cannot connect to database. Please try later or restart your server...</p>}
        {!isPending && !serverError && errMsg.length===0 && !isFetching && <div className="manage-user-account-subcontainer">
            {filteredUser.length !== 0 &&  <div className="table-containers">
                <h3 className='mana-title'>User details</h3>
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
                                <tr key={usr.id}>
                                    <td></td>
                                    <td data-cell="Name">{usr.name}</td>
                                    <td data-cell="Email">{usr.email}</td>
                                    <td data-cell="Role">{usr.role}</td>
                                    <td data-cell="Action"><button className='deleteButtRed' onClick={()=>handleDeleteAccount(usr.email, usr.role)}>Delete</button></td>
                                    {isAdmin && <td data-cell="Change role" key={usr.id}>
                                                    <select value={changedRole[usr.id]} onChange={(e)=>handleRoleChange(setChangedRole(e.target.value),usr.id)}>
                                                        <option value=''>Role</option>
                                                        <option value='guest'>Guest</option>
                                                        <option value='moderator'>Moderator</option>
                                                        <option value='admin'>Admin</option>
                                                    </select>
                                                </td>}
                                    {isAdmin&& <td data-cell="Save user"><button className='deleteButt' onClick={()=>handleSaveUser(usr.email, usr.name, usr.role)}>Save user</button></td>}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>}
        </div>}
        {!isPending && !serverError && errMsg.length===0 && !isFetching && filteredUser.length===0 && <p className='no-records'>No User found</p>}
    </div>
  )
}

export default ManageUserAccount