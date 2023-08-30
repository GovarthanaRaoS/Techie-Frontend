import React, { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const LogSign = () => {

    const [currentForm, setCurrentForm] = useState("login");

    const toggleForm = (formName) =>{
        setCurrentForm(formName);
    }

  return (
    <div className='home-container'>  
    <div className='preview-container'>
        <h1 className='prev-title'>Techie</h1>
        <div className='slogan-container'><small className='slogan'>Have fun solving our quiz on General topics</small></div>
        <p className='description'>
            Techie - is an webapp created using React, Node and MySQL database. Techie consists of general quiz questions on topics such as General Knowledge, Movies, Musics, Video Games, Animals and Computers. You scores will be saved on to the database, so you can check how well you performed in the specific topics.
        </p>
    </div>
    <div className='login-register-container'>
        {
            currentForm === "login" ? <LoginForm onFormSwitch={toggleForm} /> : <SignupForm onFormSwitch={toggleForm}/>
        }
    </div>
</div>
  )
}

export default LogSign