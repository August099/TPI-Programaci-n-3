import { Button } from "react-bootstrap";
import StoreNavbar from "../navbar/navbar.jsx"
import Home from "../store/home/Home.jsx"
import ItemsAdmin from "../store/itemsAdmin/itemsAdmin.jsx"
import Cart from "../cart/Cart.jsx"
import Products from "../store/products/products.jsx";
import ItemForm from "../store/itemForm/itemForm.jsx";
import { useEffect, useState } from "react";
import { Route, useLocation, useNavigate } from "react-router";
import { Routes } from "react-router";
import { Bounce } from "react-toastify";
import { successToast, errorToast } from "../ui/notifications/notifications";
import { } from "./storePanel.services";
import { useContext } from "react";
import { AutheticationContext } from "../services/auth/auth.context";

const StorePanel = () => {

  const items = [
    {
      id: 1,
      title: "Martillo electrico",
      description: "Martillo de acero inoxidble ultra resistente",
      price: 5000,
      discount: 0,
      category: "Electricidad",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDiNu46oEGDXOaK8OeDdJa4PdxAdvBLP_3wg&s",
      available: true
    },
    {
      id: 2,
      title: "Pinzas",
      description: "Pinzas de acero inoxidble ultra resistente",
      price: 3000,
      discount: 0.3,
      category: "Plomeria",
      imageUrl: "https://www.lusqtoff.com.ar/truper/wp-content/uploads/2024/04/17369.jpg",
      available: true
    },
    {
      id: 3,
      title: "Clavos",
      description: "texto corto",
      price: 1500,
      discount: 0,
      category: "Mecanica",
      imageUrl: "https://www.perrenycia.com.ar/2892-thickbox_default/clavos-comunes-punta-paris-de-2-bolsa-x-1-kg.jpg",
      available: true
    },
    {
      id: 4,
      title: "Taladro",
      description: "Taladro con mecha de acero inoxidble ultra resistente un saludo a la grasa que seguro ve mis videos en youtube, yo los sigo desde hace muchos años",
      price: 15000,
      discount: 0,
      category: "Construccion",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJh_K3ABWKn5F44bPHzYYJYJy04lrBzm7t_g&s",
      available: true
    },
    {
      id: 5,
      title: "Taladro",
      description: "Taladro con mecha de acero inoxidble ultra resistente un saludo a la grasa que seguro ve mis videos en youtube, yo los sigo desde hace muchos años",
      price: 15000,
      discount: 0,
      category: "Construccion",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJh_K3ABWKn5F44bPHzYYJYJy04lrBzm7t_g&s",
      available: true
    },
    {
      id: 6,
      title: "Taladro",
      description: "Taladro con mecha de acero inoxidble ultra resistente un saludo a la grasa que seguro ve mis videos en youtube, yo los sigo desde hace muchos años",
      price: 15000,
      discount: 0,
      category: "Construccion",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJh_K3ABWKn5F44bPHzYYJYJy04lrBzm7t_g&s",
      available: true
    },
    {
      id: 7,
      title: "Taladro",
      description: "Taladro con mecha de acero inoxidble ultra resistente un saludo a la grasa que seguro ve mis videos en youtube, yo los sigo desde hace muchos años",
      price: 15000,
      discount: 0,
      category: "Construccion",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJh_K3ABWKn5F44bPHzYYJYJy04lrBzm7t_g&s",
      available: true
    },
    {
      id: 8,
      title: "Taladro",
      description: "Taladro con mecha de acero inoxidble ultra resistente un saludo a la grasa que seguro ve mis videos en youtube, yo los sigo desde hace muchos años",
      price: 15000,
      discount: 0,
      category: "Construccion",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJh_K3ABWKn5F44bPHzYYJYJy04lrBzm7t_g&s",
      available: true
    },
    {
      id: 9,
      title: "Taladro",
      description: "Taladro con mecha de acero inoxidble ultra resistente un saludo a la grasa que seguro ve mis videos en youtube, yo los sigo desde hace muchos años",
      price: 15000,
      discount: 0,
      category: "Construccion",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJh_K3ABWKn5F44bPHzYYJYJy04lrBzm7t_g&s",
      available: true
    },
    {
      id: 10,
      title: "Pinzas",
      description: "Pinzas de acero inoxidble ultra resistente",
      price: 3000,
      discount: 0.3,
      category: "Construccion",
      imageUrl: "https://www.lusqtoff.com.ar/truper/wp-content/uploads/2024/04/17369.jpg",
      available: true
    },
    {
      id: 11,
      title: "Pinzas",
      description: "Pinzas de acero inoxidble ultra resistente",
      price: 3000,
      discount: 0.3,
      category: "Plomeria",
      imageUrl: "https://www.lusqtoff.com.ar/truper/wp-content/uploads/2024/04/17369.jpg",
      available: true
    },
    {
      id: 12,
      title: "Pinzas",
      description: "Pinzas de acero inoxidble ultra resistente",
      price: 3000,
      discount: 0.3,
      category: "Plomeria",
      imageUrl: "https://www.lusqtoff.com.ar/truper/wp-content/uploads/2024/04/17369.jpg",
      available: true
    },
    {
      id: 13,
      title: "Pinzas",
      description: "Pinzas de acero inoxidble ultra resistente",
      price: 3000,
      discount: 0.3,
      category: "Plomeria",
      imageUrl: "https://www.lusqtoff.com.ar/truper/wp-content/uploads/2024/04/17369.jpg",
      available: true
    },
    {
      id: 14,
      title: "Pinzas",
      description: "Pinzas de acero inoxidble ultra resistente",
      price: 3000,
      discount: 0.3,
      category: "Plomeria",
      imageUrl: "https://www.lusqtoff.com.ar/truper/wp-content/uploads/2024/04/17369.jpg",
      available: true
    },
    {
      id: 15,
      title: "Pinzas",
      description: "Pinzas de acero inoxidble ultra resistente",
      price: 3000,
      discount: 0.3,
      category: "Plomeria",
      imageUrl: "https://www.lusqtoff.com.ar/truper/wp-content/uploads/2024/04/17369.jpg",
      available: true
    },
    {
      id: 16,
      title: "Pinzas",
      description: "Pinzas de acero inoxidble ultra resistente",
      price: 3000,
      discount: 0.3,
      category: "Jardineria",
      imageUrl: "https://www.lusqtoff.com.ar/truper/wp-content/uploads/2024/04/17369.jpg",
      available: true
    },
    {
      id: 17,
      title: "Pinzas",
      description: "Pinzas de acero inoxidble ultra resistente",
      price: 3000,
      discount: 0.3,
      category: "Jardineria",
      imageUrl: "https://www.lusqtoff.com.ar/truper/wp-content/uploads/2024/04/17369.jpg",
      available: true
    },
    {
      id: 18,
      title: "Pinzas",
      description: "Pinzas de acero inoxidble ultra resistente",
      price: 3000,
      discount: 0.3,
      category: "Jardineria",
      imageUrl: "https://www.lusqtoff.com.ar/truper/wp-content/uploads/2024/04/17369.jpg",
      available: true
    },
    {
      id: 19,
      title: "Pinzas",
      description: "Pinzas de acero inoxidble ultra resistente",
      price: 3000,
      discount: 0.3,
      category: "Jardineria",
      imageUrl: "https://www.lusqtoff.com.ar/truper/wp-content/uploads/2024/04/17369.jpg",
      available: true
    },
    {
      id: 20,
      title: "Pinzas",
      description: "Pinzas de acero inoxidble ultra resistente",
      price: 3000,
      discount: 0.3,
      category: "Jardineria",
      imageUrl: "https://www.lusqtoff.com.ar/truper/wp-content/uploads/2024/04/17369.jpg",
      available: true
    },
    {
      id: 21,
      title: "Pinzas",
      description: "Pinzas de acero inoxidble ultra resistente",
      price: 3000,
      discount: 0.3,
      category: "Jardineria",
      imageUrl: "https://www.lusqtoff.com.ar/truper/wp-content/uploads/2024/04/17369.jpg",
      available: true
    },
    {
      id: 22,
      title: "Pinzas",
      description: "Pinzas de acero inoxidble ultra resistente",
      price: 3000,
      discount: 0.3,
      category: "Jardineria",
      imageUrl: "https://www.lusqtoff.com.ar/truper/wp-content/uploads/2024/04/17369.jpg",
      available: true
    },
    {
      id: 23,
      title: "Pinzas",
      description: "Pinzas de acero inoxidble ultra resistente",
      price: 3000,
      discount: 0.3,
      category: "Jardineria",
      imageUrl: "https://www.lusqtoff.com.ar/truper/wp-content/uploads/2024/04/17369.jpg",
      available: true
    },
  ]

  const location = useLocation();
  const navigate = useNavigate();
 
  const [itemsList, setItemsList] = useState([]);

  const { handleUserLogout } = useContext(AutheticationContext);

  /*const handleBookAdded = (enteredBook) => {
    if (!enteredBook.title || !enteredBook.author) {
      errorToast("El autor y titulo son requeridos");
      return;
    }

    addBook(
      enteredBook,
      (data) => {
        setBookList((prevBookList) => [data, ...prevBookList]);
        successToast(`Libro ${data.title} agregado correctamente`);
      },
      (err) => errorToast(err.message)
    );
  };*/

  /*const handleBookDeleted = (bookId) => {
    setBookList((prevBookList) =>
      prevBookList.filter((book) => book.id !== bookId)
    );
  };*/

  const handleLogOut = () => {
    handleUserLogout();
    navigate("/login");
  };

  /*const handleNavigateAddBook = () => {
    navigate("/library/add-book", { replace: true });
  };*/

  /*useEffect(() => {
    if (location.pathname === "/library") {
      getBooks(
        (data) => setBookList([...data]),
        (err) => errorToast(err.message)
      );
    }
  }, [location]);*/

  return (
    <div className="w-100 h-100 d-flex flex-column align-items-center">
      <StoreNavbar onLogout={handleLogOut}/>
  
      {/*<Button
        style={{
          position: "absolute",
          top: 10,
          right: 150,
          padding: "6px 12px",
          cursor: "pointer",
        }}
        variant="success"
        onClick={handleNavigateAddBook}
      >
        Agregar libro
        </Button>*/}
      <Routes>
        <Route
          index
          element={<Home items={items} categorias={[]}/>}
        />
        <Route
          path="/items-admin"
          element={<ItemsAdmin items={items}/>}
        />
        <Route
          path="/cart"
          element={<Cart/>}
        />
        <Route
          path="/products"
          element={<Products items={items}/>}
        />
        <Route
          path="/form"
          element={<ItemForm items={items} onItemDeleted={() => {console.log("eliminado")}}/>}
        />
      </Routes>

      {/* <Login /> */}
    </div>
  );
};

export default StorePanel;