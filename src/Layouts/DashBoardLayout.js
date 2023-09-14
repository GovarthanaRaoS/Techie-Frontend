import axios from 'axios'
import React, {useEffect, useRef, useState} from 'react'
import { useNavigate,Outlet, NavLink, Link } from 'react-router-dom';
import { Route } from "react-router-dom";
import DashboardHome from '../DashBoard Pages/DashboardHome';
import './dashboardStyles.css';
// import { Dropdown, DropdownButton } from 'react-bootstrap';

const DashBoardLayout = () => {

    const navigate = useNavigate();
    const [isDashboard, setIsDashBoard] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [isChecked,setIsChecked] = useState(false);
    const [isGotoClicked, setIsGotoClicked] = useState(false);
    const [user, setUser] = useState({});
    // const [isPending, setIsPending] = useState(true);
    // const [serverError, setServerError] = useState(false);

    useEffect(()=>{

        if(localStorage.getItem('token')!==''){
            axios.post("https://techie-webapp-api.onrender.com/checktoken",{toki: localStorage.getItem('token')}).then(res=>{
                console.log(res.data);
                if(res.data ==='Token invalid'){
                    localStorage.removeItem('token');
                    navigate('/');
                    // setIsPending(false);
                }else{
                    setIsLogged(true);
                    setUser(res.data);
                    // setIsPending(false);
                }
            }).catch(err=>{
                // setServerError(false);
                console.log('Error in Dashboard Layout: ',err)
            })
        }
    },[])

    const handleLogout = () =>{
        const clearSession = async() =>{
            setIsLogged(false);
            const response = await axios.post("https://techie-webapp-api.onrender.com/logout",{},{withCredentials: true});
            console.log("Response for logout: ",response.data);
            localStorage.removeItem('token');
            navigate('/')
        }
        clearSession();
    }

    const handleChecked = () =>{

        setIsChecked((prevCheck)=>!prevCheck);

    }

    let menuRef = useRef();
    let iconRef = useRef();

    useEffect(()=>{

        // const iconHandle = (e) =>{
        //     if(!iconRef.current.contains(e.target)){
        //         console.log('Icon clicked: ',iconRef)
        //     }
        // }

        // document.addEventListener('mousedown',iconHandle);

        // return ()=>{
        //     document.removeEventListener('mousedown',iconHandle);
        // }
        

        const handler = (e) =>{
            if(!iconRef.current.contains(e.target)){
                console.log('Icon not clicked');
                if(!menuRef.current.contains(e.target)){
                    console.log('Clicked outside')
                    setIsChecked(false);
                }
            }
        }
        document.addEventListener('mousedown',handler);

        return ()=>{

            document.removeEventListener('mousedown',handler);
        }
    })

    useEffect(()=>{
        console.log("Is Checked: ",isChecked);
        if(!isChecked){
            setIsGotoClicked(false);
        }
    },[isChecked])

    const handleNavigations = () =>{
        setIsGotoClicked(prev=>!prev);
    }

    const setFalseOnClick = () =>{
        setIsChecked(false);
    }



    const handleAccountDeletion = () =>{
        if(window.confirm('Are you sure you want to delete your account?')){
            const email = user.email;
            axios.delete(`https://techie-webapp-api.onrender.com/deleteuser/${email}`).then(res=>{
                console.log('Delete message: ',res.data);
                if(res.data==='Delete successfully'){
                    localStorage.removeItem('token');
                    navigate('/');
                }else{
                    console.log('Error while deleting account')
                }
            });
        }
    }

  return (
    <div className='dashboard-container'>
        <header className='dash-header-container'>
            <h2 className='title-logo'><Link to='/dashboard2'>Techie</Link></h2>
            <div className="user-options">
                {/* <input type="checkbox" id='checkDash' value={isChecked} checked={isChecked} onChange={handleChecked}/><label htmlFor='checkDash' className='icon-menu' ref={iconRef}>=</label> */}
                <input type="checkbox" id='checkDash' value={isChecked} checked={isChecked} onChange={handleChecked}/><label htmlFor='checkDash' className='icon-menu' ref={iconRef}>=</label>
                <div id='sub-menu-container' className={isGotoClicked?'sub-menu1-goto':"sub-menu1"} ref={menuRef}>
                    <ul>
                        <li><Link onClick={setFalseOnClick} to='/dashboard2/updateprofile'><span>Update Profile</span></Link></li>
                        <li className='got-cont'>
                            <div className="sub-menu2">
                                <span className='goto-span' onClick={handleNavigations}>Go to</span>
                                {isGotoClicked && 
                                <ul className='goto-options'>
                                    <li onClick={setFalseOnClick}><Link to='/dashboard2'>Dashboard</Link></li>
                                    <li onClick={setFalseOnClick}><Link to='/dashboard2/taketest'>Take test</Link></li>
                                    <li onClick={setFalseOnClick}><Link to='/dashboard2/previousresults'>Check scores</Link></li>
                                    {(user.role==='admin' || user.role==='moderator') && <li onClick={setFalseOnClick}><Link to='/dashboard2/manageusers'>Manage users</Link></li>}
                                </ul>
                                }
                            </div>
                        </li>
                        <li onClick={setFalseOnClick}><span className='delete-span' onClick={handleAccountDeletion}>Delete account</span></li>
                        <li onClick={setFalseOnClick}><span className='logout-span' onClick={handleLogout}>Logout</span></li>
                    </ul>
                </div>
            </div>
        </header>
        <main>
            {/* {isPending && <p className='loading-message'>Loading your dashboard. Please wait...</p>} */}
            {/* {!isPending && <Outlet/>} */}
            <Outlet/>
        </main>
        <footer>
            <p className='copyright-dash'>Copyright &copy;2023. Designed by <a className='link-white' href="https://govarthan-portfolio.web.app/home">Govarthan</a></p>
        </footer>
    </div>
  )
}

export default DashBoardLayout
