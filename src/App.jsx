import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Navbar from './components/navbar/navbar.jsx'
import Carrusel from './components/store/carrusel/carrusel.jsx'
import Card from './components/store/card/card.jsx'
import Login from './components/Auth/login/login.jsx'
import Contacto from './components/contactos/Contacto/Contacto.jsx'

function App() {

  return (
  <div>

     <BrowserRouter>

      // prueba
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Store" element={<Card />} />
      </Routes>
      
      <Navigate to="/login" />

    </BrowserRouter>

  </div>
  
  )
  }
    
export default App
