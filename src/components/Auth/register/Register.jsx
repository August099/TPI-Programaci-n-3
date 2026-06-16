import {Button, Col, Form, Row, Card} from 'react-bootstrap';
import { useNavigate } from 'react-router';
import AuthContainer from "../AuthContainer/AuthContainer";
import { useState } from "react";
import { errorToast, successToast } from "../../ui/notifications/notifications";

const Register = () => {

  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [terms, setTerms] = useState(false)

  const handleRegister = (event) => {
    event.preventDefault();
    successToast("Usuario creado exitosamente");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <>
      <AuthContainer>
        <Row className="mb-2">
          <h5>Binevenido a la Ferreteria</h5>
        </Row>

        <Form>
          <Form.Group className='mb-3' controlId="formGridEmail">
            <Form.Label className='fw-bold' onChange={(e) => setUserName(e.target.value)} value={userName}>User name</Form.Label>
            <Form.Control type="text" placeholder="User name" />
          </Form.Group>

          <Form.Group className='mb-3' controlId="formGridEmail">
            <Form.Label className='fw-bold' onChange={(e) => setEmail(e.target.value)} value={email}>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" />
          </Form.Group>

          <Form.Group className='mb-3' controlId="formGridPassword">
            <Form.Label className='fw-bold' onChange={(e) => setPassword(e.target.value)} value={password}>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
      
          <Form.Group className='mb-3' controlId="formGridPassword">
            <Form.Label className='fw-bold' onChange={(e) => setRepeatPassword(e.target.value)} value={repeatPassword}>Repeat password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
            
          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check 
              type="checkbox" 
              label="Aceptar terminos y condiciones"
              onChange={(e) => setTerms(e.target.checked)}
              checked={terms}
            />
          </Form.Group>

          <Row>
            <Col className='d-flex justify-content-center'>
              <Button className='fw-bold px-5' type='submit' style={{backgroundColor: "var(--azul)"}} onClick={handleRegister}>Registrarse</Button>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col className='d-flex flex-column justify-content-end'>
              <p className="text-center fw-bold">¿Ya tienes una cuenta?</p>
              <Button className='px-5 align-self-center' style={{backgroundColor: "#222725", border: "0"}} onClick={() => navigate("/login")}>
                Inicia sesion
              </Button>
            </Col>
          </Row>

        </Form>
      </AuthContainer>
    </>
  );
}

export default Register;