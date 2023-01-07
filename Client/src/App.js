import logo from './logo.svg';
import './App.css';
import {Routes, BrowserRouter, Route, useSearchParams} from "react-router-dom"
import Signin from './components/SignIn/signin';
import SignUp from './components/SignUp/signup';
import { useState } from 'react';
import Content from './components/Content/Content';
import Details from './components/Content/Details';





function App() {
  const [data, setData] = useState("")
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin/>}/>
        <Route path="/signUp" element ={<SignUp/>}/>
       <Route path="/Content" element={<Content/>}/>
       <Route path="/details" element={<Details data={data} setData={setData}/>}/>

      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
