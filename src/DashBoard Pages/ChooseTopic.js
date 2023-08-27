import {React,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const ChooseTopic = () => {

    const navigate = useNavigate();

    // useEffect(()=>{

    //     if(localStorage.getItem('token')!==''){
    //         axios.post("http://localhost:9092/checktoken",{toki: localStorage.getItem('token')}).then(res=>{
    //             console.log(res.data);
    //             if(res.data ==='Token invalid'){
    //                 localStorage.removeItem('token');
    //                 navigate('/');
    //             }
    //         })
    //     }

    // },[])

    const handleGeneral = () =>{
        navigate('general');
    }
    const handleMovies = () =>{
        navigate('movies');
    }
    const handleMusic = () =>{
        navigate('music');
    }
    const handleTelevision = () =>{
        navigate('television');
    }
    const handleComputers = () =>{
        navigate('computers');
    }
    const handleGeography = () =>{
        navigate('geography');
    }
    const handleMaths = () =>{
        navigate('maths');
    }
    const handleSports = () =>{
        navigate('sports');
    }
    const handleAnimals = () =>{
        navigate('animals');
    }
    const handlePolitics = () =>{
        navigate('politics');
    }
    const handleVehicles = () =>{
        navigate('vehicles');
    }
    const handlCartoons = () =>{
        navigate('cartoons')
    }

  return (
    <div className="quiz-topics-container">
        <h3>Choose a topic:</h3>
        <div className="topic-buttons-container">
            <button onClick={handleGeneral} className='topic-buttons'>General Knowledge</button>
            <button onClick={handleMovies} className='topic-buttons'>Movies</button>
            <button onClick={handleMusic} className='topic-buttons'>Music</button>
            <button onClick={handleTelevision} className='topic-buttons'>Television</button>
            <button onClick={handleComputers} className='topic-buttons'>Science: Computers</button>
            <button onClick={handleGeography} className='topic-buttons'>Geography</button>
            {/* <button onClick={handleMaths} className='topic-buttons'>Maths</button> */}
            <button onClick={handlCartoons} className='topic-buttons'>Cartoons</button>
            <button onClick={handleSports} className='topic-buttons'>Sports</button>
            <button onClick={handleAnimals} className='topic-buttons'>Animals</button>
            <button onClick={handlePolitics} className='topic-buttons'>Politics</button>
            <button onClick={handleVehicles} className='topic-buttons'>Vehicles</button>
        </div>
</div>
  )
}

export default ChooseTopic