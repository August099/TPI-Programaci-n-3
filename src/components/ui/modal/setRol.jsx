import { Button, Form, Modal, InputGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const CreateUser = ({ show, onClose, onConfirm}) => {
  const [nameValue, setNameValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('')
  const [roleValue, setRoleValue] = useState('User')

  useEffect(() => {
    setNameValue('')
    setEmailValue('')
    setPasswordValue('')
    setConfirmPasswordValue('')
    setRoleValue('User')
  }, [ show ])

  return (
    <>
      <Modal show={show} onHide={onClose} backdrop="static" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Selecciona el nuevo rol del usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{scrollbarWidth: "none"}}>
          <Form>

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={nameValue}
                onChange={(event) => {setNameValue(event.target.value)}}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                inputMode="email"
                placeholder="Email"
                value={emailValue}
                onChange={(event) => {setEmailValue(event.target.value)}}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  value={passwordValue}
                  onChange={(event) => {setPasswordValue(event.target.value)}}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirmar contraseña"
                value={confirmPasswordValue}
                onChange={(event) => {setConfirmPasswordValue(event.target.value)}}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={roleValue}
                onChange={(event) => {setRoleValue(event.target.value)}}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
                <option value="Super">Super</option>
              </Form.Select>
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SetRol;