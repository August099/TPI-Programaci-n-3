import { Button } from "react-bootstrap";
import StoreNavbar from "../navbar/navbar.jsx"
import Home from "../store/home/Home.jsx"
import ItemsAdmin from "../store/itemsAdmin/itemsAdmin.jsx"
import Cart from "../cart/Cart.jsx"
import Products from "../store/products/products.jsx";
import ItemForm from "../store/itemForm/itemForm.jsx";
import ItemDetails from "../store/itemDetails/itemDetails.jsx";
import { useEffect, useState } from "react";
import { Route, useLocation, useNavigate } from "react-router";
import { Routes } from "react-router";
import { Bounce } from "react-toastify";
import { successToast, errorToast } from "../ui/notifications/notifications";
import { useContext } from "react";
import { AutheticationContext } from "../services/auth/auth.context";
import { getRole } from "../store/store.services.js";

const StorePanel = () => {

  const location = useLocation();
  const navigate = useNavigate();
 
  const { handleUserLogout } = useContext(AutheticationContext);
  const [ userRole, setUserRole ] = useState("User")

  useEffect(() => {
    getRole(
      (data) => setUserRole(data),
      (err) => errorToast(err.message)
    );
  }, []);

  const handleLogOut = () => {
    handleUserLogout();
    navigate("/login");
  };

  return (
    <div className="w-100 h-100 d-flex flex-column align-items-center">
      <StoreNavbar onLogout={handleLogOut} role={userRole}/>
  
      <Routes>
        <Route
          index
          element={<Home/>}
        />
        <Route
          path="/items-admin" // ver la proteccion para que solo admins puedan acceder
          element={<ItemsAdmin/>}
        />
        <Route
          path="/cart"
          element={<Cart/>}
        />
        <Route
          path="/products"
          element={<Products/>}
        />
        <Route
          path="/item/:id"
          element={<ItemDetails/>}
        />
      </Routes>

    </div>
  );
};

export default StorePanel;