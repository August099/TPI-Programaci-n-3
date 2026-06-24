const QuestionItem = ({name, question, answer, delivered, answered}) => {
    return (
        <div className="d-flex flex-column gap-2 rounded-3 p-2" style={{backgroundColor: "var(--primary)"}}>
            <div className="w-100 d-flex gap-3">
                <p className="m-0">Enviado: {delivered}</p>
                <p className="m-0">Respondido: {answer ? answered : "pendiente"}</p>
            </div>
            <div className="w-100">
                <p className="m-0 fs-5 w-auto">{question}</p>
            </div>
            
            <p className="m-0 fs-6">Usuario: {name}</p>
        </div>
    )
}

export default QuestionItem