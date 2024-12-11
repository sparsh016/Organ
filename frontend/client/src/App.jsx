import { Routes,Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import {useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { lookInSession } from './common/session';

const App=()=>{
  
  return (
    <>
      <Routes>
       
            <Route path="*" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage />}/>
          
      </Routes>
    </>
      
  )
}

export default App
