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
    
    useEffect(()=>{

        if(localStorage.getItem('token')!==''){
            
            axios.post("http://localhost:9092/checktoken",{toki: localStorage.getItem('token')}).then(res=>{
                console.log("Response from useEffect for Manage users: ",res.data);
                if(res.data ==='Token invalid'){
                    localStorage.removeItem('token');
                    navigate('/');
                }else{
                    const currUsr = res.data;
                    setCurrentUser(currUsr);
                    setIsAdmin(res.data.role==='admin');
                    setIsModerator(res.data.role==='moderator');

                        const getUsers = async() =>{
                            const response = await axios.get('http://localhost:9092/getusers');
                            console.log("Response from Manage user: ",response.data);
                            if(response.data){
                                setUser(response.data);
                                // setFilteredUsers(response.data.filter(uss=>uss.email!==currentUser.email));
                                console.log('Current User Email: ',res.data.email);
                                console.log('Current User Email from state: ',currentUser.email);
                                setFilteredUser(response.data.filter(uss=>uss.email!==res.data.email));
                                console.log('Response getting users in ManageUserAccount: ',response.data);
                                console.log('Filtered Users: ',filteredUser)
                                setIsFetching(false);
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
                axios.delete(`http://localhost:9092/deleteuser/${email}`,{isModerator: isModerator, isAdmin: isAdmin}).then(res=>{
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
                axios.delete(`http://localhost:9092/deleteuser/${email}`,{isModerator: isModerator, isAdmin: isAdmin}).then(res=>{
                    console.log('Delete message: ',res.data);
                    navigate('/dashboard2/manageusers');
                });
            }
        }
        else if(role==='guest' || role === null){
            axios.delete(`http://localhost:9092/deleteuser/${email}`).then(res=>{
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
            axios.post('http://localhost:9092/updaterole',{email: changingEmail, role: changedRole})
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
        {(isPending || isFetching) && <p className='no-records'>Loading users</p>}
        {!isPending && !isFetching && <div className="manage-user-account-subcontainer">
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
                                    {isAdmin&& <td data-cell="Save user"><button className='deleteButt' disabled={usr.role==='admin' || usr.role===changedRole} onClick={()=>handleSaveUser(usr.email)}>Save user</button></td>}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>}
        </div>}
        {!isPending && !isFetching && filteredUser.length===0 && <p className='no-records'>No User found</p>}
    </div>
  )
}

export default ManageUserAccount