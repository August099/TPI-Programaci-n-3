import { Button, Form } from "react-bootstrap";
import { isAdmin } from "../store.helpers.js"
import { useState } from "react";

const QuestionItem = ({question, role, isOwner = false, onAnswer, onDelete}) => {
    const [answerValue, setAnswerValue] = useState("")
    
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // 👈 getMonth() es 0-indexado
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    
    return (
        <div className="d-flex flex-column gap-2 rounded-3 p-2" style={{backgroundColor: "var(--primary)"}}>
            <div className="w-100 d-flex gap-3">
                <p className="m-0">Enviado: {formatDate(question.createdAt)}</p>
                <p className="m-0">Respuesta: {question.answer ? formatDate(question.updatedAt) : "pendiente"}</p>
                <p className="m-0 fs-6">Usuario: {question.user.name}</p>
                {(isOwner || isAdmin(role)) && <Button className="p-0 bg-transparent border-0 text-decoration-underline fw-bold" style={{color: "var(--black)"}} onClick={() => onDelete(question.id, isOwner)}>eliminar</Button>}
            </div>
            <div className="w-100">
                <p className="m-0 fs-5 w-auto">{question.question}</p>
            </div>
            
            {question.answer &&
                <div>
                    <p className="m-0 fs-6 w-auto"><b>Respuesta del admin:</b></p>
                    <p className="m-0 ms-2 fs-5 w-auto">{question.answer}</p>
                </div>
            }
            
            {(isAdmin(role) && !question.answer) && 
                <div className="d-flex gap-2">
                    <Button onClick={() => onAnswer(question.id, answerValue, isOwner)}>Enviar</Button>
                    <Form.Control
                        type="text"
                        placeholder="Responda aqui"
                        value={answerValue}
                        onChange={(event) => setAnswerValue(event.target.value)}
                    />
                </div>
            }
            
        </div>
    )
}

export default QuestionItem