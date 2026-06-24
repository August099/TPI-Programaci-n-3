import { useLocation, useNavigate, useParams } from "react-router";
import { 
    getItem,
    addQuestion,
    getQuestions,
    deleteQuestion
} from "../store.services";
import { Container, Row, Col, Image, Button, FormControl } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import { useEffect, useState, useContext } from "react";
import { AutheticationContext } from "../../services/auth/auth.context.jsx";
import { errorToast } from "../../ui/notifications/notifications";
import { apllyDiscount } from "../store.helpers.js";
import { getRole } from "../store.services.js";
import QuestionItem from "./questionItem.jsx";

const ItemDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const { user } = useContext(AutheticationContext)
    const { id } = useParams();
    
    const [item, setItem] = useState({
        name: "",
        description: "",
        price: 0,
        discount: 0,
        categories: [],
        image: ""
    });
    const [questions, setQuestions] = useState([]);
    const [userQuestions, setUserQuestions] = useState([]);
    const [errors, setErrors] = useState({});
    const [stock, setStock] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [question, setQuestion] = useState("")

    useEffect(() => {
        getItem(
            id,
            (data) => {
                setItem(data)
                setStock(data.stock)
            },
            (err) => console.log(err)
        )

        getQuestions(
            id,
            (data) => {
                setQuestions(data.filter(q => q.userId !== user.id))
                setUserQuestions(data.filter(q => q.userId === user.id))
            },
            (err) => console.log("Error al cargar las preguntas")
        )
    }, [id]);

    const handleIncrement = () => {
        if (stock > 0) {
            setStock(stock - 1)
            setQuantity(quantity + 1)
        }
    }

    const handleDecrement = () => {
        if (quantity > 1) {
            setStock(stock + 1)
            setQuantity(quantity - 1)
        }
    }

    const handleAddQuestion = () => {
        addQuestion(
            {itemId: parseInt(id), question},
            (data) => console.log("Se realizo la pregunta"),
            (err) => console.log("Error al subir la pregunta")
        )
        setQuestion("")
    }

    return (
        <>
            <div className="w-100 h-100 p-4 d-flex flex-column" style={{overflowY:"auto", scrollbarWidth:"none"}}>
                <section className="w-100 d-flex gap-3" style={{height:"80%", minHeight:"80%"}}>
                    <div className="h-100 d-flex justify-content-center align-items-center" style={{width:"55%"}}>
                        <Image src={item.image} 
                            style={{
                                borderRadius: "10px",
                                width: "40%",
                                aspectRatio: "1/1",
                                objectFit: "cover",
                            }}/>
                    </div>
                    <div className="h-100" style={{width:"35%"}}>
                        <div className="w-100 h-100 p-2 d-flex flex-column align-items-center rounded-3 row-gap-3" style={{backgroundColor:"var(--secondary)"}}>
                            <div className="w-100 p-2 d-flex align-items-center justify-content-center rounded-3" style={{background:"var(--primary)"}}>
                                <h2 className="fw-bold m-0">{item.name}</h2>
                            </div>
                            <div className="w-100 d-flex justify-content-between">
                                <div className="p-2 d-flex align-items-center justify-content-center rounded-3" style={{background:"var(--primary)"}}>
                                    {item.discount ? 
                                    <h5 className="fw-bold m-0">Precio: <span style={{textDecoration: "line-through 2px", color: "GrayText", fontSize: "16px"}}>${item.price * quantity}</span> ${apllyDiscount(item)}</h5>
                                    :
                                    <h4 className="fw-bold m-0">Precio: ${item.price * quantity}</h4>}
                                </div>
                                <div className="p-2 d-flex align-items-center justify-content-center rounded-3" style={{background:"var(--primary)"}}>
                                    <h4 className="fw-bold m-0">Stock: {stock}</h4>
                                </div>
                            </div>
                            <div className="w-100 h-100 p-2 d-flex flex-column rounded-3" style={{background:"var(--primary)", minHeight:0}}>
                                <h3>Descripcion</h3>
                                <div style={{overflowY:"auto", scrollbarWidth:"none"}}>
                                    <p className="ms-3 fs-5 text-break">{item?.description} </p>
                                </div>
                            </div>
                            
                            <div className="w-100 d-flex justify-content-between align-items-center rounded border p-1 gap-2">
                                <Button 
                                    onClick={handleDecrement} 
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
                                    onClick={handleIncrement} 
                                    className="p-0 border-0 bg-transparent text-dark d-flex align-items-center justify-content-center"
                                    variant="light"
                                    style={{ width: "28px", height: "28px", fontSize: "1.2rem", lineHeight: 1 }}
                                >
                                +
                                </Button>
                                <Button
                                style={{
                                    backgroundColor: "#06D6A0",
                                    border: "none",
                                    color: "#222725",
                                    fontWeight: "bold",
                                }}
                            >
                                Agregar al carrito
                            </Button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="mt-3 rounded-3 p-2" style={{backgroundColor:"var(--secondary)"}}>
                    <div className="d-flex flex-column gap-2">
                        <h4>Preguntas</h4>
                        <div className="d-flex gap-2">
                            <Button onClick={handleAddQuestion}>
                                Enviar
                            </Button>
                            <FormControl
                                type="text"
                                placeholder="Pregunta aqui"
                                value={question}
                                onChange={(event) => {setQuestion(event.target.value)}}
                            />
                        </div>
                        {   userQuestions.length > 0 &&
                            <div
                                className="d-flex flex-column gap-1 mt-2"
                            >
                                <h5>Tus preguntas</h5>
                                <div
                                    className="d-flex flex-column gap-3"
                                    style={{maxHeight: "370px", overflowY: "auto", scrollbarWidth: "none"}}
                                >
                                    {userQuestions.map(q => (
                                        <QuestionItem
                                            key={q.id}
                                            name={q.user.name} 
                                            question={q.question}
                                            answer={q.answer}
                                            delivered={q.createdAt}
                                            answered={q.updatedAt}
                                        />
                                    ))}
                                </div>
                            </div>
                        }
                        {   questions.length > 0 &&
                            <div>
                                <h5>Todas las preguntas</h5>
                                {questions.map(q => (
                                    <QuestionItem 
                                        key={q.id}
                                        name={q.user.name} 
                                        question={q.question}
                                        answer={q.answer}
                                        delivered={q.createdAt}
                                        answered={q.updatedAt}
                                    />
                                ))}
                            </div>
                        }
                    </div>
                </section>
            </div>
        </>
    );
}

export default ItemDetails
