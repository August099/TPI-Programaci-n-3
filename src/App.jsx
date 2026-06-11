import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Navbar from './components/navbar/navbar.jsx'
import Carrusel from './components/store/carrusel/carrusel.jsx'
import Card from './components/store/card/card.jsx'
import Login from './components/Auth/login/login.jsx'
import Register from './components/Auth/register/Register.jsx'
import Contacto from './components/contactos/Contacto/Contacto.jsx'
import Protected from './components/routing/Protected.jsx';
import { useState } from 'react';


function App() {


  const [IsLoggedIn,SetIsLoggedIn]=useState(false)

  const handleLogin = () =>{
    SetIsLoggedIn(true)
    
  }

  

  return (
  <div className='vw-100 vh-100 p-3' style={{background: "#FEE9E1"}}>

     <BrowserRouter>


      <Routes>
        <Route path="/" element={<Navigate to="login" />} />
        <Route path="login" element={<Login onHandleLogin={handleLogin}/>} />
        <Route path="register" element={<Register onHandleLogin={handleLogin}/>} />
        <Route element={<Protected IsSignedIn={IsLoggedIn}/>}>
          <Route path="/Store" element={<Card />}/>
        </Route>

      </Routes>
      

    </BrowserRouter>

  </div>
  
  )
  }
    
export default App
