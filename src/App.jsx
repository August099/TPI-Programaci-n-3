import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Login from './components/Auth/login/login.jsx'
import Register from './components/Auth/register/Register.jsx'
import Protected from './components/routing/Protected.jsx';
import { ToastContainer } from "react-toastify";
import { useState } from 'react';
import StorePanel from './components/storePanel/storePanel.jsx';
import NotFound from './components/ui/notFound/NotFound.jsx';

function App() {
  return (
  <div className='d-flex justify-content-center align-items-center vw-100 vh-100' style={{background: "var(--primary)"}}>

     <BrowserRouter>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Navigate to="login" />} />
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        
        <Route element={<Protected/>}>
          <Route
            path="/store/*"
            element={
              <StorePanel/>
            }
          />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>

  </div>
  
  )
  }
    
export default App
