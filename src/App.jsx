import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Navbar from './components/navbar/navbar.jsx'
import Carrusel from './components/store/carrusel/carrusel.jsx'
import Card from './components/store/card/card.jsx'
import Login from './components/Auth/login/login.jsx'
import Contacto from './components/contactos/Contacto/Contacto.jsx'
import Protected from './components/routing/Protected.jsx';
import { useState } from 'react';


function App() {


  const [IsLoggedIn,SetIsLoggedIn]=useState(false)

  const handleLogin = () =>{
    SetIsLoggedIn(true)
    
  }

  

  return (
  <div>

     <BrowserRouter>

      // prueba
      <Routes>
        <Route path="/login" element={<Login onHandleLogin={handleLogin}/>} />
        <Route element={<Protected IsSignedIn={IsLoggedIn}/>}>
          <Route path="/Store" element={<Card />}/>
        </Route>

      </Routes>
      

    </BrowserRouter>

  </div>
  
  )
  }
    
export default App
