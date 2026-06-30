import { Button } from "react-bootstrap";
import StoreNavbar from "../store/navbar/navbar.jsx"
import Home from "../store/home/Home.jsx"
import ItemsAdmin from "../store/itemsAdmin/itemsAdmin.jsx"
import UsersAdmin from "../store/usersAdmin/UsersAdmin.jsx"
import Cart from "../store/cart/Cart.jsx"
import Products from "../store/products/products.jsx";
import ItemForm from "../store/itemForm/itemForm.jsx";
import ItemDetails from "../store/itemDetails/itemDetails.jsx";
import AdminProtected from "../routing/AdminProtected.jsx"
import SuperProtected from "../routing/SuperProtected.jsx"
import { useEffect, useState } from "react";
import { Route, useLocation, useNavigate } from "react-router";
import { Routes } from "react-router";
import { Bounce } from "react-toastify";
import { successToast, errorToast } from "../ui/notifications/notifications";
import { useContext } from "react";
import { AutheticationContext } from "../services/auth/auth.context";

const StorePanel = () => {

  const location = useLocation();
  const navigate = useNavigate();
 
  const { handleUserLogout, user } = useContext(AutheticationContext);

  const handleLogOut = () => {
    handleUserLogout();
    navigate("/login");
  };

  return (
    <div className="w-100 h-100 d-flex flex-column align-items-center">
      <StoreNavbar onLogout={handleLogOut} role={user.role}/>
  
      <Routes>
        <Route
          index
          element={<Home/>}
        />

        <Route element={<AdminProtected/>}>
          <Route
            path="/items-admin"
            element={<ItemsAdmin/>}
          />
        </Route>

        <Route element={<SuperProtected/>}>
          <Route
            path="/users-admin"
            element={<UsersAdmin/>}
          />
        </Route>
        
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