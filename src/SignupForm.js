import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const SignupForm = (props) => {

  const adminKey = 'gopi1234';
  const moderatorKey = 'gova1234';

    const userRef = useRef();

    const userNameRegex = /^[a-zA-Z]{3,23}$/
    const userEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%]).{8,24}$/

    const [userName, setUserName] = useState("");
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [userEmail, setUserEmail] = useState("");
    const [validUserEmail, setValidUserEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [emailExist, setEmailExists] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [confpwd, setConfPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [databaseError, setDatabaseError] = useState(false);

    const [role, setRole] = useState('');

    const [secretKey, setSecretKey] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isModerator, setIsModerator] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);

    const [saving, setSaving] = useState('');

    useEffect(()=>{
        userRef.current.focus();
    },[])

    useEffect(()=>{
        const result = userNameRegex.test(userName);
        console.log("Username regex: ",result);
        console.log(userName);
        setValidName(result);
    },[userName])

    useEffect(()=>{
        const result = userEmailRegex.test(userEmail);
        console.log("UserEmail regex: ",result);
        console.log(userEmail);
        setValidUserEmail(result);
    },[userEmail])

    useEffect(()=>{
        const result = passwordRegex.test(pwd);
        console.log("Password regex:",result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === confpwd;
        setValidMatch(match);
    },[pwd,confpwd])

    useEffect(()=>{
        setErrMsg("");
    },[userName, userEmail, pwd, confpwd])

    const handleSubmit = async(e) =>{
      e.preventDefault();
      setIsSubmit(true);
      let isValidRole = false;
      if(role.length===0){
        isValidRole = false;
      }else{
        isValidRole = true;
      }
      if(secretKey === adminKey){
        
      }else{
        
      }

      let roleValdiation = false;
      if(role === 'admin'){
        if(secretKey === adminKey){
          setIsAdmin(true);
          roleValdiation = true;
        }else{
          setIsAdmin(false);
          roleValdiation = false;
        }
      }else if(role === 'moderator'){
        if(secretKey === moderatorKey){
          setIsModerator(true);
          roleValdiation = true;
        }else{
          setIsModerator(false);
          roleValdiation = false;
        }
      }else if(role === 'guest'){
        roleValdiation = true;
      }

      console.log("Username: ",userName);
      console.log("UserEmail: ", userEmail);
      console.log("Userpassword: ", pwd);
      console.log("Role: ",role);
      console.log('IsValidRole: ',isValidRole);
      console.log('SecretKey: ',secretKey);
      console.log('IsAdmin: ',isAdmin);
      if(validName&& validUserEmail&& validPwd&& validMatch && isValidRole && roleValdiation){
        setSaving('Saving user data');
        const response = await axios.post("https://techie-webapp-api.onrender.com/saveuser",{
          name: userName,
          email: userEmail,
          password: pwd,
          role: role
        });
        console.log("Response data: ",response.data);
        if(response.data.message === 'error'){
          setDatabaseError(true);
          setSaving('');
          setTimeout(()=>{
            setIsSubmit(false);
          },7000)
          return;
        }
        setSaving('');
        if(response.data === "Email already exists"){
          setEmailExists(true);
          setTimeout(()=>{
            setIsSubmit(false);
            setEmailExists(false);
          },"3000")
          return
        }else{
          console.log("stored successfully");
          console.log(response.data);
          console.log(response.accessToken)
          setSuccess(true);
          setSaving('');
          props.onFormSwitch("login");
          // setTimeout(()=>{
          //   setIsSubmit(false);
          //   setSuccess(false);
          //   // navigate("/home",{onFormSwitch:"login"});
          //   props.onFormSwitch("login");
          // },"3000")
        }
      }else{
        setSaving('');
        setIsInvalid(true);
        setTimeout(()=>{
          setIsInvalid(false);
        },"3000")
        console.log("Invalid credentials");
      }

    }

  return (
    <div className='signup-container'>
        {/* <p ref={errRef} className={errMsg?"errmsg":"offscreen"} aria-live='assertive'>{errMsg}</p> */}
        {isSubmit&& success && <small className='success-message'>Registeration successfull. Please Login to continue</small>}
        {isSubmit&& isInvalid && <small className='error-message'>Invalid credentials</small>}
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Signup</legend>
                <div className="userName-container">
                    <input 
                    type="text" 
                    placeholder='Enter your Username'
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e)=>setUserName(e.target.value)}
                    value={userName}
                    required
                    aria-invalid={validName?"false":"true"}
                    aria-describedby='uidnote'
                    onFocus={()=>setNameFocus(true)}
                    onBlur={()=>setNameFocus(false)}
                      />
                      {isSubmit && userName.length === 0 && <small className='error-message'>Please provide an name</small>}
                      {isSubmit && userName && userName.length<3 && <small className='error-message'>Name should be atleast 3 characters longs</small>}
                      {isSubmit && userName && userName.length>23 && <small className='error-message'>Name should not be atleast 23 characters longs</small>}
                      {isSubmit && userName && userName.length>=3 && userName.length<=23 && !userNameRegex.test(userName) && <small className='error-message'>Name should not contain numbers or special characters</small>}
                </div>
                <div className="userEmail-container">
                    <input 
                    type="email" 
                    placeholder='Enter your email id'
                    onChange={(e)=>setUserEmail(e.target.value)}
                    value={userEmail}
                    required
                    aria-invalid={validUserEmail?"false":"true"}
                    aria-describedby='emailnote'
                    onFocus={()=>setEmailFocus(true)}
                    onBlur={()=>setEmailFocus(false)}
                      />
                      {isSubmit && userEmail.length === 0 && <small className='error-message'>Please enter an email</small>}
                      {isSubmit && userEmail && !userEmailRegex.test(userEmail) && <small className='error-message'>Invalid email pattern</small>}
                      {isSubmit && emailExist && <small className='error-message'>Email already exists</small>}
                </div>
                <div className="userPassword-container">
                    <input 
                    type="password" 
                    placeholder='Enter your password'
                    onChange={(e)=>setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-invalid={validPwd?"false":"true"}
                    aria-describedby='pwdnote'
                    onFocus={()=>setPwdFocus(true)}
                    onBlur={()=>setPwdFocus(false)}
                      />
                      {isSubmit && pwd.length === 0 && <small className='error-message'>Password is required</small>}
                      {isSubmit && pwd && pwd.length<8 && <small className='error-message'>Password must be atleast 8 characters long</small>}
                      {isSubmit && pwd && pwd.length>24 && <small className='error-message'>Password must not be more than 24 characters long</small>}
                      {isSubmit && pwd && pwd.length>=8 && pwd.length<24 && !passwordRegex.test(pwd) && <small className='error-message'>Must include atleast one uppercase and one lowercase letter, a number and a special character.
                        Allowed special characters:
                        <span aria-label='exclamation mark'>!</span>
                        <span aria-label='at symbol'>@</span>
                        <span aria-label='hashtag'>#</span>
                        <span aria-label='dollar sign'>$</span>
                        <span aria-label='percent'>%</span></small>}
                </div>
                <div className="confirmPassword-container">
                    <input 
                    type="password" 
                    placeholder='Confirm your password'
                    onChange={(e)=>setConfPwd(e.target.value)}
                    value={confpwd}
                    required
                    aria-invalid={validMatch?"false":"true"}
                    aria-describedby='confpwdnote'
                    onFocus={()=>setMatchFocus(true)}
                    onBlur={()=>setMatchFocus(false)}
                      />
                      {isSubmit && confpwd.length === 0 && <small className='error-message'>Please confirm the password</small>}
                      {isSubmit && confpwd && confpwd.length<8 && <small className='error-message'>Password must be atleast 8 characters long</small>}
                      {isSubmit && confpwd && confpwd.length>24 && <small className='error-message'>Password must not be more than 24 characters long</small>}
                      {isSubmit && confpwd && confpwd.length>=8 && confpwd.length<24 && pwd!==confpwd && <small className='error-message'>Passwords do not match</small>}
                      {/* <p id='confpwdnote' className={matchFocus && confpwd && !validMatch ? "instructions" : "offscreen"}>
                        Passwords do not match.
                      </p> */}
                </div>
                <div className="role-container">
                  <select name="role" id="role" value={role} onChange={(e)=>setRole(e.target.value)}>
                    <option value="" disabled>Choose a Role</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                    <option value="guest">Guest</option>
                  </select>
                  {isSubmit && role.length===0 && <small className='error-message'>Please select a role</small>}
                  {role==='admin' && 
                  <div className='secret-key-container'>
                    <div className="secret-keys">
                      <small className='und passkey'>For Recruiter's reference</small>
                      <br />
                      <small className='passkey'>Admin key - gopi1234</small>
                      <br />
                      <small className='passkey'>Moderator key - gova1234</small>
                    </div>
                    <input type="text" placeholder='Please enter the Secret key' value={secretKey} onChange={(e)=>setSecretKey(e.target.value)} />
                    {isSubmit && secretKey.length === 0 && <small className='error-message'>Please enter the secret key</small>}
                    {isSubmit && secretKey && !isAdmin && <small className='error-message'>Key does not match</small>}
                  </div>}
                  {role==='moderator' && 
                  <div className='secret-key-container'>
                    <div className="secret-keys">
                      <small className='und passkey'>For Recruiter's reference</small>
                      <br />
                      <small className='passkey'>Admin key - gopi1234</small>
                      <br />
                      <small className='passkey'>Moderator key - gova1234</small>
                    </div>
                    <input type="text" placeholder='Please enter the Secret key' value={secretKey} onChange={(e)=>setSecretKey(e.target.value)} />
                    {isSubmit && secretKey.length === 0 && <small className='error-message'>Please enter the secret key</small>}
                    {isSubmit && secretKey && !isModerator && <small className='error-message'>Key does not match</small>}
                  </div>}
                </div>
                {saving.length>0 && !databaseError && <small className='inbetween-data'>{saving}</small>}
                {isSubmit && databaseError && <small className='inbetween-data'>Can't connect to database. Please try later.</small>}
                <button onClick={()=>setIsSubmit(true)} className='loginButt'>Sign up</button>
            </fieldset>
        </form>
        <hr />
        <p>Already have an account?</p>
        <button onClick={()=>props.onFormSwitch("login")} className='signupButt'>Login</button>
    </div>
  )
}

export default SignupForm
