import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const UpdatePage = () => {

    // const [user, setUser] = useState({});
    const nameRegex = /^[a-zA-Z]{3,23}$/;
    const phoneRegex = /^[0-9]*$/;

    const [name, setName] = useState('');
    // const [validName, setValidName] = useState(false);
    const [nameTouched, setNameTouched] = useState(false);

    const [email, setEmail] = useState('');
    // const [validEmail, setValidEmail] = useState(false);
    // const [emailTouched, setEmailTouched] = useState(false);

    const [phone, setPhone] = useState('');
    // const [validPhone, setValidPhone] = useState(false);
    const [phoneTouched, setPhoneTouched] = useState(false);

    const [isCollGrad, setIsCollGrad] = useState(false);
    const [isEmployee, setIsEmployee] = useState(false);

    const [highgrad, setHighGrad] = useState('');
    // const [validHighgrad, setValidHighgrad] = useState(false);
    const [highgradTouched, setHighgradTouched] = useState(false);

    const [college, setCollege] = useState('');
    // const [validCollege, setValidCollege] = useState(false);
    const [collegeTouched, setCollegeTouched] = useState(false);
    
    const [company, setCompany] = useState('');
    // const [validCompany, setValidCompany] = useState(false);
    const [companyTouched, setCompanyTouched] = useState(false);

    const [profession, setProfession] = useState('');
    // const [validProfession, setValidProfession] = useState(false);
    const [professionTouched, setProfessionTouched] = useState(false);

    const [isPending, setIsPending] = useState(true);
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{

        if(localStorage.getItem('token')!==''){
            axios.post("http://localhost:9092/checktoken",{toki: localStorage.getItem('token')}).then(res=>{
                console.log(res.data);
                if(res.data ==='Token invalid'){
                    localStorage.removeItem('token');
                    navigate('/');
                }else{
                    setName(res.data.name);
                    setEmail(res.data.email);
                    setPhone(res.data.phoneno === null?'':res.data.phoneno);
                    setHighGrad(res.data.highest_grad === null?'':res.data.highest_grad);
                    setCollege(res.data.college_name === null?'':res.data.college_name);
                    setCompany(res.data.company_name === null?'':res.data.company_name);
                    setProfession(res.data.profession === null?'':res.data.profession);
                    setIsPending(false);
                    // setUser(res.data);
                }
            })
        }
    },[])

    // function validateFields(){
    //     if(name.length>3 && name.length<=23 && nameRegex.test(name)){
    //         setValidName(true);
    //     }else{
    //         setValidName(false);
    //     }
    //     if(phone.length === 10 && phoneRegex.test(phone)){
    //         setValidPhone(true);
    //     }else{
    //         setValidPhone(false);
    //     }
    //     if(isCollGrad){
    //         if(highgrad !== ''){
    //             setValidHighgrad(true);
    //         }else{
    //             setValidHighgrad(false);
    //         }
    //         if(college.length>=10){
    //             setValidCollege(true);
    //         }else{
    //             setValidCollege(false);
    //         }
    //     }else{
    //         setValidCollege(true);
    //         setValidHighgrad(true);
    //     }
    //     if(isEmployee){
    //         if(company.length>=5){
    //             setValidCompany(true);
    //         }else{
    //             setValidCompany(false);
    //         }
    //         if(profession.length>=2){
    //             setValidProfession(true);
    //         }else{
    //             setValidProfession(false);
    //         }
    //     }else{
    //         setValidProfession(true);
    //         setValidCompany(true);;
    //     }

    //     if(validCollege && validCompany && validHighgrad && validName && validPhone && validProfession){
    //         return true;
    //     }else{
    //         return false;
    //     }

    // }


    let validName = false;
    let validPhone = false;
    let validCompany = false;
    let validHighgrad = false;
    let validCollege = false;
    let validProfession = false;

    function validateFields(){
        if(name.length>3 && name.length<=23 && nameRegex.test(name)){
            validName = true;
        }else{
            validName = false;
        }
        if(phone.length === 10 && phoneRegex.test(phone)){
            validPhone = true;
        }else{
            validPhone = false;
        }
        if(isCollGrad){
            if(highgrad !== ''){
                validHighgrad = true;
            }else{
                validHighgrad = false;
            }
            if(college.length>=10){
                validCollege = true;
            }else{
                validCollege = false;
            }
        }else{
            validCollege = true;
            validHighgrad = true;
        }
        if(isEmployee){
            if(company.length>=5){
                validCompany = true;
            }else{
                validCompany = false;
            }
            if(profession.length>=2){
                validProfession = true;
            }else{
                validProfession = false;
            }
        }else{
            validProfession = true;
            validCompany = true;
        }

        if(validCollege && validCompany && validHighgrad && validName && validPhone && validProfession){
            return true;
        }else{
            console.log('========')
            console.log('College',validCollege)
            console.log('Company',validCompany)
            console.log('high grad',validHighgrad)
            console.log('name',validName)
            console.log('phone',validPhone);
            console.log('Phone length: ',phone.length)
            console.log('Phone Regex: ',phoneRegex.test(phone))
            console.log('prof',validProfession)
            return false;
        }

    }

    const handleSubmit = (event) =>{
        setIsSubmitClicked(true);

        console.log(validateFields());

        console.log('========')
        console.log('College',college)
        console.log('Company',company)
        console.log('high grad',highgrad)
        console.log('name',name)
        console.log('phone',phone);
        console.log('Phone length: ',phone.length)
        console.log('Type of phone: ',typeof(phone))
        console.log('Phone Regex: ',phoneRegex.test(phone))
        console.log('prof',profession)

        if(validateFields()){
            
            axios.post('http://localhost:9092/updateuser',{
                    name:name,
                    email: email,
                    phoneno: phone,
                    highest_grad: isCollGrad ? highgrad : '',
                    college_name: isCollGrad ? college : '',
                    profession: isEmployee ? profession : '',
                    company_name: isEmployee ? company : ''

                }).then(res=>console.log(res));
            console.log('Success');
            navigate('/dashboard2')
        }else{
            setNameTouched(true);
            setPhoneTouched(true);
            setHighgradTouched(true);
            setCollegeTouched(true);
            setCompanyTouched(true);
            setProfessionTouched(true);
            setTimeout(()=>{
                setNameTouched(false);
                setPhoneTouched(false);
                setHighgradTouched(false);
                setCollegeTouched(false);
                setCompanyTouched(false);
                setProfessionTouched(false);
            },5000)
        }
        
        event.preventDefault();
    }

  return (
    <div className='update-container'>
        {isPending && <p>Loading data</p>}
        {!isPending && <form onSubmit={handleSubmit}>
            {/* <fieldset> */}
                <legend>Update Details</legend>
                <div className="name-container">
                    <label htmlFor="name">Name&emsp;</label>
                    <input type="text" 
                    id='name' 
                    name='name' 
                    value={name} 
                    // defaultValue={name} 
                    onChange={(e)=>setName(e.target.value)} 
                    onFocus={(e)=>setNameTouched(true)} 
                    onBlur={(e)=>setNameTouched(false)}/>
                    {nameTouched && name.length === 0 && <small className='err-msg'>Name is required</small>}
                    {nameTouched && name.length < 3 && name.length !== 0 && <small className='err-msg'>Name must be atleast 3 characters long</small>}
                    {nameTouched && name.length > 23 && <small className='err-msg'>Name must not be more than 23 characters long</small>}
                    {nameTouched && name.length > 3 && name.length<=23 && !nameRegex.test(name) && <small className='err-msg'>Name should not contain special characters or numbers</small>}
                </div>
                <div className="email-container">
                    <label htmlFor="email">Email&emsp;</label>
                    <input type="email" id='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} disabled/>
                </div>
                <div className="phoneno-container">
                    <label htmlFor="phone">Phone&emsp;</label>
                    <input type="text" 
                    id='phone' 
                    name='phone' 
                    value={phone} 
                    // defaultValue={phone} 
                    onChange={(e)=>setPhone(e.target.value)}
                    onFocus={(e)=>setPhoneTouched(true)}
                    onBlur={(e)=>setPhoneTouched(false)}
                    />
                    {phoneTouched && phone.length === 0 && <small className='err-msg'>Phone number is required</small>}
                    {phoneTouched && phone.length < 10 && phone.length !== 0 && <small className='err-msg'>Phone number must be 10 digits</small>}
                    {phoneTouched && phone.length > 10 && <small className='err-msg'>Phone number must not be more than 10 digits</small>}
                    {phoneTouched && phone.length === 10 && !phoneRegex.test(phone) && <small className='err-msg'>Phone number must not contain alphabets,spaces or special characters</small>}
                </div>
                <div className="isCollegeGrad-container">
                    <input type="checkbox" id='isCollegeGrad' checked={isCollGrad} onChange={(e)=>setIsCollGrad(!isCollGrad)} /><label htmlFor="isCollegeGrad"><small>Check the box if you have a degree.</small></label>
                </div>
                <div className="collgrad-container-block">
                    <div className="highgrad-container">
                        <label htmlFor="highgrad">Highest Graduation&emsp;</label>
                        <select name="highgrad" 
                        id="highgrad" 
                        value={highgrad} 
                        onChange={(e)=>setHighGrad(e.target.value)}
                        onFocus={(e)=>setHighgradTouched(true)}
                        onBlur={(e)=>setHighgradTouched(false)}
                        disabled={!isCollGrad}
                        >
                            <option value='' disabled>Select</option>
                            <option value="B.E/B.Tech">B.E/B.Tech</option>
                            <option value="B.Sc">B.sc</option>
                            <option value="M.E/MBA">M.E/MBA</option>
                        </select>
                        {isCollGrad && highgradTouched && highgrad === '' && <small className='err-msg'>Please select an option</small>}
                    </div>
                    <div className="college-container">
                        <label htmlFor="college">College Name&emsp;</label>
                        <input type="text" 
                        id='college' 
                        name='college' 
                        value={college} 
                        // defaultValue={college} 
                        // onChange={(e)=>setCollege(e.target.value)}
                        onChange={(e)=>setCollege(e.target.value)}
                        onFocus={(e)=>setCollegeTouched(true)}
                        onBlur={(e)=>setCollegeTouched(false)}
                        disabled={!isCollGrad}
                        />
                        {isCollGrad && collegeTouched && college.length === 0 && <small className='err-msg'>College name is required</small>}
                        {isCollGrad && collegeTouched && college.length<10 && college.length !== 0 && <small className='err-msg'>College name cannot be smaller than 10 characters</small>}
                    </div>
                </div>
                <div className="isEmployee-container">
                    <input type="checkbox" id='isEmployee' checked={isEmployee} onChange={(e)=>setIsEmployee(!isEmployee)} /><label htmlFor="isEmployee"><small>Check the box if you are employed.</small></label>
                </div>
                <div className="company-container">
                    <label htmlFor="company">Company Name&emsp;</label>
                    <input type="text" 
                    id='company' 
                    name='company' 
                    value={company} 
                    // defaultValue={company} 
                    onChange={(e)=>setCompany(e.target.value)}
                    onFocus={(e)=>setCompanyTouched(true)}
                    onBlur={(e)=>setCompanyTouched(false)}
                    disabled={!isEmployee}
                    />
                    {isEmployee && companyTouched && company.length === 0 && <small className='err-msg'>Company name is required</small>}
                    {isEmployee && companyTouched && company.length<5 && company.length !== 0 && <small className='err-msg'>Company name must be atleast 5 characters long.</small>}
                </div>
                <div className="profession-container">
                    <label htmlFor="profession">Profession&emsp;</label>
                    <input type="text" 
                    id='profession' 
                    name='profession' 
                    value={profession} 
                    // defaultValue={profession} 
                    onChange={(e)=>setProfession(e.target.value)}
                    onFocus={(e)=>setProfessionTouched(true)}
                    onBlur={(e)=>setProfessionTouched(false)}
                    disabled={!isEmployee}
                    />
                    {isEmployee && professionTouched && profession.length === 0 && <small className='err-msg'>Please mention your profession.</small>}
                    {isEmployee && professionTouched && profession.length<2 && profession.length !== 0 && <small className='err-msg'>Profession field must more than 2 characters</small>}
                </div>
                <div className="update-butt-container">
                    <button className='updateButt'>Update</button>
                </div>
            {/* </fieldset> */}
        </form>}
    </div>
  )
}

export default UpdatePage