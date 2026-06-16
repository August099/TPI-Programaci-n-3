import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Navbar from './components/navbar/navbar.jsx'
import Carrusel from './components/store/carrusel/carrusel.jsx'
import Card from './components/store/card/card.jsx'
import Login from './components/Auth/login/login.jsx'
import Register from './components/Auth/register/Register.jsx'
import Contacto from './components/contactos/Contacto/Contacto.jsx'
import Protected from './components/routing/Protected.jsx';
import { ToastContainer } from "react-toastify";
import CartPage from './components/cart/Cart.jsx';
import { useState } from 'react';
import Home from './components/store/home/Home.jsx';

import './App.css'


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
<<<<<<< HEAD
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Navigate to="login" />} />
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        
        <Route element={<Protected/>}>
          <Route path="/Store" element={<Card />}/>
=======

      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/Home"/>} />
        <Route path="/login" element={<Login onHandleLogin={handleLogin}/>} />
        <Route path="/card" element={<Card />}/>
        <Route path="/home" element={<Home />}/>
        <Route element={<Protected IsSignedIn={IsLoggedIn}/>}>
      
>>>>>>> items
        </Route>

      </Routes>
      

    </BrowserRouter>

  </div>
  
  )
  }
    
export default App
