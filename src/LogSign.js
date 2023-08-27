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
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim velit placeat, a quos adipisci pariatur, odio modi quam numquam totam molestiae delectus doloremque magni voluptas repellendus, beatae architecto optio aliquid!. Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores officia unde dignissimos vero cumque ut, fuga et amet impedit eveniet ipsa architecto dolorem ea molestias error. Quibusdam magni ab cupiditate?
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