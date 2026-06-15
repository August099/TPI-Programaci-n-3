import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Navbar from './components/navbar/navbar.jsx'
import Carrusel from './components/store/carrusel/carrusel.jsx'
import Card from './components/store/card/card.jsx'
import Login from './components/Auth/login/login.jsx'
import Contacto from './components/contactos/Contacto/Contacto.jsx'
import Protected from './components/routing/Protected.jsx';
import { useState } from 'react';
import Home from './components/store/home/Home.jsx';


function App() {


  const [IsLoggedIn,SetIsLoggedIn]=useState(false)

  const handleLogin = () =>{
    SetIsLoggedIn(true)
    
  }

  

  return (
  <div>

     <BrowserRouter>

      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/Home"/>} />
        <Route path="/login" element={<Login onHandleLogin={handleLogin}/>} />
        <Route path="/card" element={<Card />}/>
        <Route path="/home" element={<Home />}/>
        <Route element={<Protected IsSignedIn={IsLoggedIn}/>}>
      
        </Route>

      </Routes>
      

    </BrowserRouter>

  </div>
  
  )
  }
    
export default App
