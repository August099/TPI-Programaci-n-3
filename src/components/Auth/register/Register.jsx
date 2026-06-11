import {Button, Col, Form, Row, Card} from 'react-bootstrap';
import { useNavigate } from 'react-router';
import AuthContainer from "../AuthContainer/AuthContainer";


const Register = ({onHandleLogin}) => {

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
        style={{ maxWidth: "800px" }}
      >
        <Card.Body>
          <Row className="mb-2">
            <h5>Binevenido a la Ferreteria</h5>
          </Row>

          <Form>
            <Row className="mb-3">

              <Col md={5}>
                <Form.Group className='mb-3' controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className='mb-3' controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
            
                <Form.Group controlId="formGridPassword">
                  <Form.Label>Repeat password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
              </Col>

              <Col md={7}>
                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Address</Form.Label>
                  <Form.Control placeholder="1234 Main St" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress2">
                  <Form.Label>Address 2</Form.Label>
                  <Form.Control placeholder="Apartment, studio, or floor" />
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Select defaultValue="Choose...">
                      <option>Choose...</option>
                      <option>...</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control />
                  </Form.Group>
                </Row>
              </Col>

            </Row>

            <Form.Group className="mb-3" id="formGridCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <Row>
              <Col className='d-flex justify-content-center'>
                <Button className='px-5' type='submit'>Registrarse</Button>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className='d-flex flex-column justify-content-end'>
                <p className="text-center fw-bold">¿Ya tienes una cuenta?</p>
                <Button variant='secondary' className='px-5 align-self-center' onClick={() => navigate("/login")}>
                  Inicia sesion
                </Button>
              </Col>
            </Row>

          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default Register;