import './App.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Switch ,Route } from 'react-router-dom';
import HomeLayout from './Layouts/HomeLayout';
import Home from './Home';
import ShowMembers from './ShowMembers';
import Dashboard from './Dashboard';
import { useState } from 'react';
import DashBoardLayout from './Layouts/DashBoardLayout';
import TakeTest from './DashBoard Pages/TakeTest';
import DashboardHome from './DashBoard Pages/DashboardHome';
import GeneralKnowledge, { generalApiLoader } from './QuizPages/GeneralKnowledge';
import ChooseTopic from './DashBoard Pages/ChooseTopic';
import Movies from './QuizPages/Movies';
import Television from './QuizPages/Television';
import Music from './QuizPages/Music';
import Computers from './QuizPages/Computers';
import Geography from './QuizPages/Geography';
import Maths from './QuizPages/Maths';
import Sports from './QuizPages/Sports';
import Animals from './QuizPages/Animals';
import Politics from './QuizPages/Politics';
import Vehicles from './QuizPages/Vehicles';
import Scoreboard from './QuizPages/Scoreboard';
import LogSign from './LogSign';
import About from './About';
import Cartoons from './QuizPages/Cartoons';
import PreviousResults from './DashBoard Pages/PreviousResults';
import UpdatePage from './DashBoard Pages/UpdatePage';
import NotFound from './NotFound';
import Contact from './Contact';

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path="/" element={<HomeLayout/>}>
      <Route path='/' element={<Home/>}>
        <Route index element={<LogSign/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        {/* <Route path='/showmembers' element={<ShowMembers/>}/> */}
      </Route>
      {/* <Route path='/dashboard' element={<Dashboard/>}/> */}
      <Route path='/dashboard2' element={<DashBoardLayout/>}>
        <Route index element={<DashboardHome/>}/>
        <Route path='taketest' element={<TakeTest/>}>
          <Route index element={<ChooseTopic/>}/>
          <Route path='general' element={<GeneralKnowledge/>}/>
          <Route path='movies' element={<Movies/>}/>
          <Route path='music' element={<Music/>}/>
          <Route path='television' element={<Television/>}/>
          <Route path='computers' element={<Computers/>}/>
          <Route path='geography' element={<Geography/>}/>
          <Route path='maths' element={<Maths/>}/>
          <Route path='cartoons' element={<Cartoons/>}/>
          <Route path='sports' element={<Sports/>}/>
          <Route path='animals' element={<Animals/>}/>
          <Route path='politics' element={<Politics/>}/>
          <Route path='vehicles' element={<Vehicles/>}/>
          {/* <Route path='scoreboard' element={<Scoreboard/>}/> */}
        </Route>
        <Route path='previousresults' element={<PreviousResults/>}/>
        <Route path='updateprofile' element={<UpdatePage/>}/>
      </Route>
      <Route path='*' element={<NotFound/>}/>
    </Route>
  )
)

function App() {

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
