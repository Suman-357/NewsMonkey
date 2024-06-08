import React, { useState } from 'react'
import Navbar from './components/Navbar';
import {
  BrowserRouter,
  Route,
  Routes 
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import News  from './components/News';
const App =()=> {
  const pageSize=5
  // apikey = process.env.REACT_NEWS_APP_API_KEY;
    
  const [progress,setProgress]= useState(0)

    return (
      <div>
        <BrowserRouter>
        <Navbar/>
        <LoadingBar
        height={3}
        color='red'
        Progress={progress}
      />
        {/* <News  setProgress={setProgress} pageSize={6} country='in' category='general'/> */}
        <Routes>
          <Route exact path='/' element={<News setProgress={setProgress} key="general" pageSize={6} country='in' category='general'/>}></Route>
          <Route exact path='/business' element={<News setProgress={setProgress} key="business" pageSize={6} country='in' category='business'/>}></Route>
          <Route exact path='/entertainment' element={<News setProgress={setProgress} key="entertainment" pageSize={3} country='in' category='entertainment'/>}></Route>
          <Route exact path='/general' element={<News setProgress={setProgress} key="general" pageSize={6} country='in' category='general'/>}></Route>
          <Route exact path='/health' element={<News setProgress={setProgress} key="health"pageSize={6} country='in' category='health'/>}></Route>
          <Route exact path='/science' element={<News setProgress={setProgress} key="science" pageSize={6} country='in' category='science'/>}></Route>
          <Route exact path='/sports' element={<News setProgress={setProgress} key="sports" pageSize={6} country='in' category='sports'/>}></Route>
          <Route exact path='/technology' element={<News setProgress={setProgress} key="technology" pageSize={6} country='in' category='technology'/>}></Route>
        </Routes>
        </BrowserRouter>
      </div>
    )
  }


export default App;
