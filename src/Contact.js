import axios from 'axios';
import React, { useState } from 'react'

const Contact = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isSendClicked, setIsSendClicked] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const nameRegex = /^[A-Z]'?[-a-zA-Z]+$/;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    function validation(){
        let validName = false;
        let validEmail = false;
        let validSubject = false;
        let validMessage = false;

        if(name.length !== 0 && name.length>2 && nameRegex.test(name)){
            validName = true;
        }else{
            validName = false;
        }

        if(email.length !==0 && emailRegex.test(email)){
            validEmail = true;
        }else{
            validEmail = false;
        }
        if(subject.length !== 0){
            validSubject = true;
        }else{
            validSubject = false
        }
        if(message.length !== 0){
            validMessage = true;
        }else{
            validMessage = false;
        }
        if(validName && validEmail && validSubject && validMessage){
            return true;
        }else{
            return false;
        }
    }

    const handleSubmit = (event) =>{
        
        event.preventDefault();
        setIsSendClicked(true);
        if(validation()){
            const details = {
                name: name,
                email: email,
                subject: subject,
                message: message
            }
            console.log("Details: ",details);
            axios.post('http://localhost:9092/contact',{
            name: name,
            email: email,
            subject: subject,
            message: message
        }).then(res=>{
            console.log(res.data);
            if(res.data){
                setIsSuccess(true);
                setTimeout(()=>{
                    setName('');
                    setEmail('');
                    setSubject('');
                    setMessage('');
                    setIsSendClicked(false);
                    setIsSuccess(false);
                },5000)
            }
        });
        }else{
            console.log('Invalid Credentials')
        }

    }

  return (
    <div className='contact-container'>
        <form onSubmit={handleSubmit} className='form-container'>
            <p className='contact-welcome'>Hello. Thanks for taking your time and visiting my project. My name is Govarthana Rao. Please type your feedback or purpose of visit here. I will respond to you as soon as possible.</p>
            <div className="contact-name-container">
                <label htmlFor="contact-name">Name:</label>
                <input type="text" id='contact-name' value={name} onChange={(e)=>setName(e.target.value)} required/>
                {isSendClicked && name.length === 0 &&<small className='error-message'>Name is required</small>}
                {isSendClicked && name && name.length <3 &&<small className='error-message'>Name should be atleast three characters long</small>}
                {isSendClicked && name.length >3&& !nameRegex.test(name) &&<small className='error-message'>Name should not contain numbers or special characters</small>}
            </div>
            <div className="contact-email-container">
                <label htmlFor="contact-email">Email:</label>
                <input type="email" id='contact-email'  value={email} onChange={(e)=>setEmail(e.target.value)} required />
                {isSendClicked && email.length === 0 && <small className='error-message'>Email is required</small>}
                {isSendClicked && email && !emailRegex.test(email) && <small className='error-message'>Invalid email pattern</small>}
            </div>
            <div className="contact-subject-container">
                <label htmlFor="contact-subject">Subject:</label>
                <input type="text" id='contact-subject'  value={subject} onChange={(e)=>setSubject(e.target.value)} required />
                {isSendClicked && subject.length === 0 && <small className='error-message'>Please provide an subject</small>}
            </div>
            <div className="contact-message-container">
                <label htmlFor="contact-message">Message:</label>
                <textarea name="contactMessage" id="contact-message" cols="30" rows="10"  value={message} onChange={(e)=>setMessage(e.target.value)} required></textarea>
                {isSendClicked && message.length === 0 && <small className='error-message'>Please type your purpose of visit or feedback.</small>}
            </div>
            {isSendClicked && isSuccess && <small className='success-message'>Thanks you for the message. I will reach back to you as soon as possible.</small>}
            <div className='sendButt-container'>
                <button className='sendButt'>Send Message</button>
            </div>
        </form>
    </div>
  )
}

export default Contact