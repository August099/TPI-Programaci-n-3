import {Button, Col, Row, Form, Card} from 'react-bootstrap';
import { useNavigate } from 'react-router';
import AuthContainer from "../AuthContainer/AuthContainer";

import { useState, useContext } from "react";
import { errorToast } from "../../ui/notifications/notifications";
import { validateLoginUser } from "../auth.services";
import { loginUser } from "./Login.services";

import { AutheticationContext } from "../../services/auth/auth.context.jsx";
//import { useTranslate } from "../../services/translation/useTranslate";

const Login = () => {

  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  
  const { handleUserLogin } = useContext(AutheticationContext);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailErrorMessage(null)
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordErrorMessage(null)
  };

  const hasErrors = (errors) => {
    const {emailError, passwordError, userError} = errors

    if (emailError || passwordError) {
      setEmailErrorMessage(emailError)
      setPasswordErrorMessage(passwordError)
      return true
    }

    if (userError) {
      errorToast(userError)
      return true
    }

    return false
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = validateLoginUser({email, password})
    
    if (hasErrors(result)) return

    loginUser(
      email,
      password,
      (token) => {
        handleUserLogin(token);
        navigate("/store");
      },
      hasErrors
    );
  };

  return (
    <>
      <AuthContainer>
          <Row className="text-center fw-bold mb-2">
            <h4>Ingrese su cuenta</h4>
          </Row>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="formGridEmail">
              <Form.Label className='fw-bold'>Email</Form.Label>
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

            <Form.Group className="mb-4" controlId="formGridPassword">
              <Form.Label className='fw-bold'>Password</Form.Label>
              <Form.Control
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
              value={password}
              className={passwordErrorMessage && "border border-danger border-3"}
              />
              {passwordErrorMessage && <Form.Label>{passwordErrorMessage}</Form.Label>}
            </Form.Group>

            <Row>
              <Col className='d-flex justify-content-center'>
                <Button className='fw-bold px-5' type="submit" style={{backgroundColor: "var(--blue)"}}>
                  Iniciar sesion
                </Button>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className='d-flex flex-column justify-content-end'>
                <p className="text-center fw-bold">¿Aun no tienes cuenta?</p>
                <Button className='border-0 px-5 align-self-center' style={{backgroundColor: "#222725"}} onClick={() => navigate("/register")}>Registrate</Button>
              </Col>
            </Row>
          
          </Form>
      </AuthContainer>
    </>
  );
}

export default Login;