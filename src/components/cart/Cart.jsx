import { useState } from "react";
import { Button, Card } from "react-bootstrap";

const carritoinicial = [
  { 
    id: 1, 
    name: "Camiseta Térmica Cyberpunk", 
    price: 49.99, 
    quantity: 1, 
    size: "L", 
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=150" 
  },
  { 
    id: 2, 
    name: "Zapatillas Urbanas 'Ghost'", 
    price: 120.00, 
    quantity: 2, 
    size: "42", 
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150" 
  }
];

const CartPage = () => {
  const [cart, setCart] = useState(carritoinicial);

  const cambiarCantidad = (id, incremento) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + incremento) }
          : item
      )
    );
  };

  const eliminarProducto = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal;

  return (
    <div className="vh-100 py-5 px-3 text-dark" style={{ backgroundColor: "#FEE9E1", overflowY: "auto" }}>
      <div className="container" style={{ maxWidth: "1024px" }}>
        
        <Button variant="link" className="text-decoration-none text-secondary p-0 mb-4 text-start">
          ← Volver a la tienda
        </Button>

        <h1 className="h2 fw-bold text-dark mb-4">Tu Carrito</h1>


        <div className="row g-4">
          

          <div className="col-12 col-lg-8">
            {cart.length === 0 ? (
              <p className="text-center py-5 text-secondary bg-white rounded-3 border">
                Tu carrito está vacío.
              </p>
            ) : (
              cart.map((item) => (
                <Card
                  key={item.id} 
                  style={{ backgroundColor: "#B09E99" }}
                  className="p-3 mb-3 rounded-3 border-0 shadow-sm"
                >
                  <div className="row align-items-center g-3">

                    <div className="col-3 col-sm-2">
                      <Card.Img src={item.image} className="img-fluid rounded-3" alt={item.name} />
                    </div>
                    

                    <div className="col-5 col-sm-6">
                      <h5 className="mb-1 fw-bold text-dark text-truncate">{item.name}</h5>
                      <p className="text-muted small mb-1">Talla: {item.size}</p>
                      <p className="mb-0 fw-bold">${item.price.toFixed(2)}</p>
                    </div>
                    
                    <div className="col-4 col-sm-4 d-flex flex-column align-items-end gap-2">
                      <div className="d-flex align-items-center rounded border p-1 gap-2">
                        <Button 
                          onClick={() => cambiarCantidad(item.id, -1)} 
                          className="p-0 border-0 bg-transparent text-dark d-flex align-items-center justify-content-center"
                          variant="light"
                          style={{ width: "28px", height: "28px", fontSize: "1.2rem", lineHeight: 1 }}
                        >
                          -
                        </Button>
                        
                        <span className="fw-semibold text-dark text-center" style={{ minWidth: "24px" }}>
                          {item.quantity}
                        </span>
                        
                        <Button
                          onClick={() => cambiarCantidad(item.id, 1)} 
                          className="p-0 border-0 bg-transparent text-dark d-flex align-items-center justify-content-center"
                          variant="light"
                          style={{ width: "28px", height: "28px", fontSize: "1.2rem", lineHeight: 1 }}
                        >
                          +
                        </Button>
                      </div>

                      <Button 
                        onClick={() => eliminarProducto(item.id)}
                        title="Eliminar producto"
                        variant="danger"
                        className="btn-sm border-0"
                        style={{ backgroundColor: "#D91E36" }}
                      >
                        🗑️
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          <div className="col-12 col-lg-4">
            <div className="bg-white border rounded-3 p-4 shadow-sm">
              <h2 className="h5 fw-bold text-dark mb-4">Resumen</h2>
              
              <div className="d-flex justify-content-between text-secondary pb-3 mb-3 border-bottom">
                <span>Subtotal</span>
                <span className="fw-bold text-dark">${subtotal.toFixed(2)}</span>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="fw-bold text-dark">Total:</span>
                <span className="h4 fw-bolder text-primary mb-0">${total.toFixed(2)}</span>
              </div>

              <Button 
                className="w-100 text-white fw-bold py-2 rounded-3 border-0"
                variant="success"
                style={{ backgroundColor: "#2A9134" }}
              >
                Continuar el pago
              </Button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default CartPage