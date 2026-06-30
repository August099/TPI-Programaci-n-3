import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { errorToast, successToast } from "../../ui/notifications/notifications";
import CartItem from "./CartItem";

import {
    getCart,
    incrementQuantity,
    decrementQuantity,
    removeItemFromCart,
    clearCart,
    updateStock
} from "../store.services"
import { apllyDiscount } from "../store.helpers";
import Confirm from "../../ui/modal/confirm";


const CartPage = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  

  useEffect(() => {
    getCart(
      (data) => {
        if (Object.keys(data).length > 0) {
          setCart(data.cart_items)
        }
      },
      (err) => {
        errorToast("Error al cargar el carrito")
      }
    )
  }, [])

  useEffect(() => {
    calculateTotal()
    calculateSubTotal()
  }, [cart])

  const calculateTotal = () => {
    setTotal(
      cart.reduce((acc, cur) => {
        return acc + (cur.quantity * apllyDiscount(cur.item))
      }, 0)
    )
  }

  const calculateSubTotal = () => {
    setSubTotal(
      cart.reduce((acc, cur) => {
        return acc + (cur.quantity * cur.item.price)
      }, 0)
    )
  }

  const handleIncrement = (item, quantity) => {
    if (quantity < item.stock) {
      incrementQuantity(
        item.id,
        (data) => {
          setCart((prevCart) =>
            prevCart.map((itemCart) =>
              itemCart.item.id === item.id
                ? { ...itemCart, quantity: data.quantity }
                : itemCart
            )
          )
        },
        (err) => errorToast("Error al agregar al carrito")
      )
    }
  }

  const handleDecrement = (item, quantity) => {
    if (quantity > 1) {
      decrementQuantity(
        item.id,
        (data) => {
          setCart((prevCart) =>
            prevCart.map((itemCart) =>
              itemCart.item.id === item.id
                ? { ...itemCart, quantity: data.quantity }
                : itemCart
            )
          )
        },
        (err) => errorToast("Error al quitar del carrito")
      )
    }
  }

  const handleDeleteItem = (itemId) => {
    removeItemFromCart(
      itemId,
      (data) => {
          setCart((prevCart) =>
            prevCart.filter((itemCart) =>
              itemCart.item.id !== itemId
            )
          )
        },
      (err) => {console.log(err), errorToast("Error al eliminar del carrito")}
    )
  }

  const handleConfirmPurchase = () => {
    cart.map((cartItem) => {
      updateStock(
        cartItem.item.id,
        cartItem.item.stock - cartItem.quantity,
        () => successToast("Stock actualizado correctamente."),
        () => errorToast("Error al actualizar el stock.")
      )
    })

    clearCart(
      () => {
        setCart([])
        successToast("Compra realizada con exito.")
      },
      (err) => errorToast("Error al realizar la compra")
    )
    setShowConfirmModal(false)
  }

  const handleCleanCart = () => {
    if (cart.length) {
      clearCart(
        () => {
          setCart([])
          successToast("Carrito vaciado.")
        },
        (err) => errorToast("Error al vaciar el carrito.")
      )
    } else {
      errorToast("El carrito ya esta vacio.")
    }
  }

  return (
    <div className="w-100 py-5 px-3 " style={{ backgroundColor: "var(--primary)", overflowY: "auto", color: "var(--black)" }}>
      <div className="container" style={{ maxWidth: "1024px" }}>
        <h1 className="h2 fw-bold text-dark mb-4">Tu Carrito</h1>

        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <div className="d-flex flex-row-reverse">
              <Button
                className="border fw-bold"
                style={{backgroundColor:"var(--secondary)", borderBottomLeftRadius: "0", borderBottomRightRadius: "0", color: "var(--black)"}}
                onClick={handleCleanCart}
              >
                Limpiar carrito
              </Button>
            </div>
          
            <div className="d-flex flex-column gap-3">
              {cart.length === 0 ? (
                <p
                  className="text-center py-5 border fw-bold" 
                  style={{backgroundColor: "var(--secondary)", borderTopLeftRadius: "15px", borderBottomLeftRadius: "15px", borderBottomRightRadius: "15px"}}
                >
                  Tu carrito está vacío.
                </p>
              ) : (
                cart.map(({item, quantity}) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    quantity={quantity}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                    onDeleteItem={handleDeleteItem}
                  />
                ))
              )}
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="border rounded-3 p-4" style={{backgroundColor: "var(--secondary)"}}>
              <h2 className="h5 fw-bold text-dark mb-4">Resumen</h2>
              
              <div className="d-flex justify-content-between pb-3">
                <span>Subtotal:</span>
                <span className="fw-bold">${subTotal}</span>
              </div>

              <div className="d-flex justify-content-between pb-3 mb-3 border-bottom">
                <span>Total descuentos:</span>
                <span className="fw-bold">${subTotal - total}</span>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="fs-5 fw-bold text-dark">Total:</span>
                <span className="fs-5 fw-bolder mb-0">${total}</span>
              </div>

              <Button
                onClick={() => cart.length ? setShowConfirmModal(true) : errorToast("Carrito vacio.")}
                className="w-100 text-black fw-bold py-2 rounded-3 border-0"
                variant="success"
                style={{ backgroundColor: "var(--green)" }}
              >
                Confirmar compra
              </Button>
            </div>
          </div>

        </div>

      </div>
      <Confirm
        actionTitle={"Confirmar compra"}
        message={"¿Estas seguro que quieres continuar con la compra?."}
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmPurchase}
      />
    </div>
  );
}

export default CartPage