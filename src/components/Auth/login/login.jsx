import {Button, Col, Row, Form, Card} from 'react-bootstrap';
import { useNavigate } from 'react-router';
import AuthContainer from "../AuthContainer/AuthContainer";


const Login = ({onHandleLogin}) => {

  const navigate = useNavigate();
  const handlelogin = (event) =>{
    event.preventDefault()
    onHandleLogin()
    navigate("/Store")
  }

  return (
    <>
      <Card
      className="mt-4 mx-auto p-3 px-5 shadow"
      style={{ maxWidth: "400px" }}
      >
        <Card.Body>
          <Row className="mb-2">
            <h5>Binevenido a la Ferreteria</h5>
          </Row>

          <Form>
            <Form.Group className="mb-4" controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Row>
              <Col className='d-flex justify-content-center'>
                <Button className='px-5' type="submit">
                  Iniciar sesion
                </Button>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className='d-flex flex-column justify-content-end'>
                <p className="text-center fw-bold">¿Aun no tienes cuenta?</p>
                <Button variant='secondary' className='px-5 align-self-center' onClick={() => navigate("/register")}>Registrate</Button>
              </Col>
            </Row>
          
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default Login;