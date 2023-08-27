import axios from 'axios';
import {React, useState,useEffect, useRef} from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import './QuizPagesStyles/GeneralStyles.css';

const Movies = () => {
  const [questions, setQuestion] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [choices, setChoices] = useState([]);

  const [isPending, setIsPending] = useState(true);

  const [user, setUser] = useState({});

    const navigate = useNavigate();

    // useEffect(()=>{

    //     if(localStorage.getItem('token')!==''){
    //         axios.post("http://localhost:9092/checktoken",{toki: localStorage.getItem('token')}).then(res=>{
    //             console.log(res.data);
    //             if(res.data ==='Token invalid'){
    //                 localStorage.removeItem('token');
    //                 navigate('/');
    //             }else{
    //                 setUser(res.data);
    //             }
    //         })
    //     }
    // },[])

  useEffect(()=>{
      
      const generalApi = async() =>{

          const response = await axios.get('https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple');

          if(response.data.results.length!==0){

              setChoices(response.data.results.map(qst=>{
                  return [...qst.incorrect_answers, qst.correct_answer].sort(()=>Math.random()-0.5);
              }));

              console.log('Choices: ',choices);
              console.log('Response: ',response.data.results);
              setQuestion(response.data.results);
              setIsPending(false);
          }

      }
      generalApi();

  },[])

  const handleNext = () =>{
      setCurrentQuestion(currentQuestion+1);
      console.log('next: ',currentQuestion+1);
  }

  const [ans, setAns] = useState('');
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  const handlePrevious = () =>{
      setCurrentQuestion(currentQuestion-1);
  }

  const handleClicked = (ind,ans) =>{

      setAns(ans);
      console.log('Executed')

          const findIndex = scoreSheet.findIndex(x=>x.index===ind);
          if(findIndex !== -1){
              scoreSheet.splice(findIndex,1);
              scoreSheet.push({
                  index: ind,
                  selectedAns: ans
              })
          }else{
              scoreSheet.push({
                  index: ind,
                  selectedAns: ans
              })
          }
          scoreSheet.sort((a,b)=>{
              return a.index - b.index 
          })
      console.log('Clicked Answer: ',scoreSheet);
  }

  function takeScore(){
      scoreSheet.sort((a,b)=>{
          return a.index - b.index 
      })
      let totalScore = 0;
      console.log('Sorted Scoresheet: ',scoreSheet);
      for(let i=0; i<questions.length; i++){
          console.log(scoreSheet[i].selectedAns,'===',questions[i].correct_answer)
          if(scoreSheet[i].selectedAns === questions[i].correct_answer){
              totalScore++;
          }
      }
      return totalScore;
  }

  const [scoreSheet, setScoreSheet] = useState([])
  const [notAllAns, setNotAllAns] = useState('');
  const [success, setSuccess] = useState('');
  const [isQuizValid, setIsQuizValid] = useState(false);
  const [scr , setScr] = useState(0);

  const handleSubmit = () =>{
      setIsSubmitClicked(true);
      if(scoreSheet.length<questions.length){
          setNotAllAns('Please answer all the questions');
          setTimeout(()=>{
              setIsSubmitClicked(false);
              setNotAllAns('');
          },3000)
      }else{
          setSuccess('Thanks for taking the test. Redirecting to scoreboard.');
          setTimeout(()=>{
              setIsSubmitClicked(false);
              setSuccess('');
              setIsQuizValid(true);
              const score = takeScore();
              console.log('Sorted Scoresheet: ',score);
              setScr(score);
              const jsDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
                console.log('Date: ',jsDate);
                axios.post("http://localhost:9092/savescores",{name: user.name, email: user.email, score: score, category: questions[0].category, date: jsDate}).then(res=>console.log(res.data))
              // console.log('set score: ',score);
              // navigate('/dashboard2/taketest/scoreboard',{state:{score: score, category: questions[0].category}});
          },3000);
      }
  }

  const handleTakeTest = () =>{
    navigate('/dashboard2/taketest')
  }

return (
  <div className='question-container'>
      {isPending && <div className='loading'>Loading questions...</div>}
      {!isPending && !isQuizValid &&
      <div className='q-cont'>
          <h3>Question {currentQuestion+1} of {questions.length}</h3>
          <p className='question'>{questions[currentQuestion].question}</p>
          <ul className='options-list'>

              {choices[currentQuestion].map(choice=>{
                  return(
                      <li key={choice} className={(scoreSheet.findIndex(x=>x.index-1 === currentQuestion)>=0 && scoreSheet.findIndex(x=>x.selectedAns===`${choice}`)>=0) || ans === `${choice}` ?'activeli': ''} onClick={()=>handleClicked(currentQuestion+1,choice)}>{choice}</li>
                  )
              })}

          </ul>
          <div className="buttons-container">
              <button disabled={currentQuestion<1?true:false} className='prevButt' onClick={handlePrevious}>Previous</button>
              <button className='submitButt' onClick={handleSubmit}>Submit</button>
              <button disabled={currentQuestion+1 >=questions.length ?true:false} className='nextButt' onClick={handleNext}>Next</button>
          </div>
          {isSubmitClicked && notAllAns.length!==0 && <p className='msg'>{notAllAns}</p>}
          {isSubmitClicked && success.length!==0 && <p className='msg'>{success}</p>}
      </div>
      }
      {!isPending && isQuizValid && <div className='scoreboard'>
          <p>Congratulations, you have scored {scr} in {questions[0].category}</p>
          <p>Click the below button to take test on other topics</p>
          <div><button className='takeTestButt' onClick={handleTakeTest}>Take another Test</button></div>
        </div>}
  </div>
)
}

export default Movies