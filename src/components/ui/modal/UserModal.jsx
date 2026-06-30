import { Button, Form, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { validateRegisterUser } from '../../Auth/auth.services';

const UserModal = ({ user, show, onClose, onConfirm}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [role, setRole] = useState('User')

  const [nameErrorMessage, setNameErrorMessage] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  const [repeatPasswordErrorMessage, setRepeatPasswordErrorMessage] = useState(null);

  useEffect(() => {
    if (user) {
        setName(user.name)
        setEmail(user.email)
        setPassword('')
        setRepeatPassword('')
        setRole('User')
    }
  }, [ user ])
  
  useEffect(() => {
    if (show === false) {
        setName('')
        setEmail('')
        setPassword('')
        setRepeatPassword('')
        setRole('User')
    }
  }, [ show ])

    const hasErrors = (errors) => {
        const {nameError, emailError, passwordError, repeatPasswordError, userError} = errors

        if (nameError || emailError || passwordError || repeatPasswordError) {
            setNameErrorMessage(nameError)
            setEmailErrorMessage(emailError)
            setPasswordErrorMessage(passwordError)
            setRepeatPasswordErrorMessage(repeatPasswordError)
            return true
        }

        if (userError) {
            errorToast(userError)
            return true
        }

        return false
    }

  const handleConfirm = () => {
    const user = {
        name,
        email,
        password,
        repeatPassword,
        role
    }
    
    const errors = validateRegisterUser(user)

    if (hasErrors(errors)) return

    onConfirm(user)
  }

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
                            placeholder="Nombre de usuario"
                            value={name}
                            onChange={(event) => {setName(event.target.value)}}
                            autoFocus
                            className={nameErrorMessage && "border border-danger border-3"}
                        />
                        {nameErrorMessage && <Form.Label>{nameErrorMessage}</Form.Label>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            inputMode="email"
                            placeholder="Email"
                            value={email}
                            onChange={(event) => {setEmail(event.target.value)}}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                
                        <Form.Control
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(event) => {setPassword(event.target.value)}}
                        />
              
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirmar contraseña"
                            value={repeatPassword}
                            onChange={(event) => {setRepeatPassword(event.target.value)}}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Role</Form.Label>
                        <Form.Select
                            value={role}
                            onChange={(event) => {setRole(event.target.value)}}
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
                <Button variant="primary" onClick={handleConfirm}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}

export default UserModal;