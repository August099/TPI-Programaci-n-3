import {Button, Col, Form, Row, Card} from 'react-bootstrap';
import { useNavigate } from 'react-router';
import AuthContainer from "../AuthContainer/AuthContainer";
import { useState } from "react";
import { errorToast, successToast } from "../../ui/notifications/notifications";
import { validateRegisterUser } from "../auth.services";
import { registerUser } from "./Register.services.js";

const Register = () => {

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [nameErrorMessage, setNameErrorMessage] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  const [repeatPasswordErrorMessage, setRepeatPasswordErrorMessage] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameErrorMessage(null)
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailErrorMessage(null)
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordErrorMessage(null)
  };

  const handleRepeatPasswordChange = (event) => {
    setRepeatPassword(event.target.value);
    setRepeatPasswordErrorMessage(null)
  };

  const handleRegister = (event) => {
    event.preventDefault();

    const {nameMessage, emailMessage, passwordMessage, repeatPasswordMessage} = validateRegisterUser({name, email, password, repeatPassword})
        
    if (nameMessage || emailMessage || passwordMessage || repeatPasswordMessage) {
      setNameErrorMessage(nameMessage)
      setEmailErrorMessage(emailMessage)
      setPasswordErrorMessage(passwordMessage)
      setRepeatPasswordErrorMessage(repeatPasswordMessage)
      return
    }

    registerUser(
      name,
      email,
      password,
      repeatPassword,
      () => {
        successToast("Usuario creado exitosamente");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      },
      (err) => console.log(err)
    )
  };

  return (
    <>
      <AuthContainer>
        <Row className="mb-2">
          <h5>Binevenido a la Ferreteria</h5>
        </Row>

        <Form>
          <Form.Group className='mb-3' controlId="formGridEmail">
            <Form.Label className='fw-bold' onChange={(e) => setName(e.target.value)} value={name}>User name</Form.Label>
            <Form.Control
              type="text"
              placeholder="User name"
              onChange={handleNameChange}
              value={name}
              className={nameErrorMessage && "border border-danger border-3"}
            />
            {nameErrorMessage && <Form.Label>{nameErrorMessage}</Form.Label>}
          </Form.Group>

          <Form.Group className='mb-3' controlId="formGridEmail">
            <Form.Label className='fw-bold' onChange={(e) => setEmail(e.target.value)} value={email}>Email</Form.Label>
            <Form.Control
              type="text"
              autoComplete="email"
              inputMode="email"
              placeholder="Enter email"
              onChange={handleEmailChange}
              value={email}
              className={emailErrorMessage && "border border-danger border-3"}
            />
            {emailErrorMessage && <Form.Label>{emailErrorMessage}</Form.Label>}
          </Form.Group>

          <Form.Group className='mb-3' controlId="formGridPassword">
            <Form.Label className='fw-bold' onChange={(e) => setPassword(e.target.value)} value={password}>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
              value={password}
              className={passwordErrorMessage && "border border-danger border-3"}
            />
            {passwordErrorMessage && <Form.Label>{passwordErrorMessage}</Form.Label>}
          </Form.Group>
      
          <Form.Group className='mb-3' controlId="formGridPassword">
            <Form.Label className='fw-bold' onChange={(e) => setRepeatPassword(e.target.value)} value={repeatPassword}>Repeat password</Form.Label>
            <Form.Control 
              type="password"
              placeholder="Repeat password"
              onChange={handleRepeatPasswordChange}
              value={repeatPassword}
              className={repeatPasswordErrorMessage && "border border-danger border-3"}
            />
            {repeatPasswordErrorMessage && <Form.Label>{repeatPasswordErrorMessage}</Form.Label>}
          </Form.Group>

          <Row>
            <Col className='d-flex justify-content-center'>
              <Button className='fw-bold px-5 mt-3' type='submit' style={{backgroundColor: "var(--azul)"}} onClick={handleRegister}>Registrarse</Button>
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