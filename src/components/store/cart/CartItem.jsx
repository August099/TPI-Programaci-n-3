import { Button, Card, Row } from "react-bootstrap"
import { Trash } from "react-bootstrap-icons"
import { apllyDiscount } from "../store.helpers"

const CartItem = ({item, quantity, onIncrement, onDecrement, onDeleteItem}) => {
    return (
        <Card
            style={{ backgroundColor: "var(--secondary)" }}
            className="d-flex align-items-center justify-content-center p-3 rounded-3 border-0"
        >
            <Row>
                <div className="col-2 m-0">
                    <Card.Img src={item.image} className="img-fluid rounded-3" alt={item.name} />
                </div>
                

                <div className="d-flex align-items-center col-5 m-0">
                    <h5 className="fs-5 fw-bold text-truncate">{item.name}</h5>
                </div>

                <div className="col-4 d-flex flex-column gap-3 align-items-center m-0">
                    {item.discount ? <h5 className="fw-bold"><span style={{textDecoration: "line-through 2px", color: "GrayText", fontSize: "16px"}}>${item.price * quantity}</span> ${apllyDiscount(item) * quantity}</h5> : <h5 className="fw-bold">${item.price * quantity}</h5>}
                    <div className="d-flex align-items-center rounded border p-1 gap-2">
                        <Button 
                            onClick={() => onDecrement(item, quantity)}
                            className="p-0 border-0 bg-transparent text-dark d-flex align-items-center justify-content-center"
                            variant="light"
                            style={{ width: "28px", height: "28px", fontSize: "1.2rem", lineHeight: 1 }}
                        >
                            -
                        </Button>
                    
                        <span className="fw-semibold text-dark text-center" style={{ minWidth: "24px" }}>
                            {quantity}
                        </span>
                    
                        <Button
                            onClick={() => onIncrement(item, quantity)}
                            className="p-0 border-0 bg-transparent text-dark d-flex align-items-center justify-content-center"
                            variant="light"
                            style={{ width: "28px", height: "28px", fontSize: "1.2rem", lineHeight: 1 }}
                        >
                            +
                        </Button>
                    </div>
                </div>
                
                <div className="col-1 d-flex align-items-center gap-2 m-0">
                    <Button 
                        onClick={() => onDeleteItem(item.id)}
                        title="Eliminar producto"
                        variant="danger"
                        className="p-2 border-0"
                        style={{ backgroundColor: "#D91E36" }}
                    >
                        <Trash size={20}/>
                    </Button>
                </div>
            </Row>
        </Card>
    )
}

export default CartItem