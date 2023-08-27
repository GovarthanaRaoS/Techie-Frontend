import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const LoginForm = (props) => {

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%]).{8,24}$/
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [validLoginEmail, setValidLoginEmail] = useState(false);
  const [loginEmailTouched, setLoginEmailTouched] = useState(false);
  const [accNot, setAccNot] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token')||'');

  let validEmail = false;
  let validPassword = false;

  const [loginPassword, setLoginPassword] = useState("");
  const [validLoginPassword, setValidLoginPassword] = useState(false);
  const [loginPasswordTouched, setloginPasswordTouched] = useState(false);
  const [inValidCreds, setInvalidCreds] = useState(false);

  const [isRememberMe, setIsRememberMe] = useState(false);
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async(e) =>{

    e.preventDefault();
    setIsLoginClicked(true);
    console.log("isLogClic: ",isLoginClicked);
    console.log('email: ',loginEmail)
    if(loginEmail.length === 0 || !emailRegex.test(loginEmail)){
      validEmail = false;
    }else{
      validEmail = true;
    }
    if(loginPassword.length === 0 || loginPassword.length<8 || loginPassword.length>24 || !passwordRegex.test(loginPassword)){
      validPassword = false;
    }else{
      validPassword = true;
    }
    if(validEmail && validPassword){
      console.log("Valid username and password");
      console.log("Sending to db");
      console.log("login email: ",loginEmail);
      console.log("login password: ",loginPassword)
      const response = await axios.post("http://localhost:9092/login",{
        email : loginEmail,
        password : loginPassword,
      },{withCredentials: true});
      console.log("Response from server: ",response.data);
      if(response.data === "Invalid credentials"){
        setInvalidCreds(true);
        setTimeout(()=>{
          setInvalidCreds(false)
        },'3000')
      }else if(response.data === "Account does not exist"){
        setAccNot(true);
        setTimeout(()=>{
          setAccNot(false)
        },'3000')
      }else if(response.data){
        setSuccess(true);
        // setLoginEmail("");
        // setLoginPassword("");
        const toki = response.data.token;
        localStorage.setItem('token',toki);
        setToken('');
        setTimeout(()=>{
          setSuccess(false);
          navigate('/dashboard2');
        },'3000');
      }
    }else{
      console.log("Invalid credentials input")
    }

  }

  return (
    <div className='login-container'>
        <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Login</legend>
                    <div className='userEmail-container'>
                        <input type="email" placeholder='Email' name='loginEmail' value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)} onFocus={()=>setLoginEmailTouched(true)} required/>
                        {isLoginClicked &&  loginEmail.length === 0 && <small className='error-message'>Email is required</small>}
                        <br />
                        {isLoginClicked &&  loginEmail && !emailRegex.test(loginEmail)&&<small className='error-message'>Invalid Email pattern</small>}
                    </div>
                    <div className='userPassword-container'>
                        <input type="password" placeholder='Password' name='loginPassword' value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)} onFocus={()=>setloginPasswordTouched(true)} required />
                        {isLoginClicked && loginPassword.length === 0 && <small className='error-message'>Password is required</small>}
                        {isLoginClicked && loginPassword && (loginPassword.length<8 || loginPassword.length>24) &&<small className='error-message'>Password should be atleast 8 characters long and less than 24 characters</small>}
                        {isLoginClicked && loginPassword.length>=8 && loginPassword.length<=24 && !passwordRegex.test(loginPassword) &&<small className='error-message'>Must include atleast one uppercase and one lowercase letter, a number and a special character.</small>}
                    </div>
                    {/* <div className="rememberMe-container">
                      <input type="checkbox" id='remem' checked={isRememberMe} onChange={()=>setIsRememberMe(!isRememberMe)}/><label htmlFor='remem'><small>Remember me</small></label>
                    </div> */}
                    {isLoginClicked && inValidCreds && <small className='error-message'>Invalid credentials</small>}
                    {isLoginClicked && accNot && <small className='error-message'>Account does not exist</small>}
                    {isLoginClicked && success && <small className='success-message'>Login Successful. Redirecting to dashboard</small>}
                    <button className='loginButt'>Login</button>
                </fieldset>
            </form>
            <hr />
            <p>Don't have an account?</p>
            <button onClick={()=>props.onFormSwitch("signup")} className='signupButt'>Sign up</button>
    </div>
  )
}

export default LoginForm