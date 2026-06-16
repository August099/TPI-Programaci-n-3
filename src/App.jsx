import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Navbar from './components/navbar/navbar.jsx'
import Login from './components/Auth/login/login.jsx'
import Register from './components/Auth/register/Register.jsx'
import Contacto from './components/contactos/Contacto/Contacto.jsx'
import CartPage from './components/cart/Cart.jsx';
import Card from './components/store/card/card.jsx'
import Protected from './components/routing/Protected.jsx';
import { ToastContainer } from "react-toastify";

import { useState } from 'react';

import './App.css'
import Home from './components/store/home/Home.jsx';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const handleLogIn = () => {
    setLoggedIn(true);
  };

  const handleLogOut = () => {
    setLoggedIn(false);
  };

  return (
  <div className='d-flex justify-content-center align-items-center vw-100 vh-100 p-3 ' style={{background: "var(--primary)"}}>

     <BrowserRouter>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Navigate to="login" />} />
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        
        <Route element={<Protected/>}>
          <Route path="/card" element={<Card />}/>
        </Route>

      </Routes>
      

    </BrowserRouter>

  </div>
  
  )
  }
    
export default App
