import {Button, Form} from 'react-bootstrap';
import { useNavigate } from 'react-router';

function BasicExample() {

  const navigate = useNavigate();

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Contraseña" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Acepto los términos y condiciones" />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={() => {
        preventdefault();
        navigate('/Store')}}>
        Enviar
      </Button>
    </Form>
  );
}

export default BasicExample;