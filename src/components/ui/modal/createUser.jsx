import { Button, Form, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { validateRegisterUser } from '../../Auth/auth.services';
import { errorToast } from '../notifications/notifications';

const CreateUser = ({ show, onClose, onConfirm}) => {
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
        setName('')
        setEmail('')
        setPassword('')
        setRepeatPassword('')
        setRole('User')

        setNameErrorMessage(null)
        setEmailErrorMessage(null)
        setPasswordErrorMessage(null)
        setRepeatPasswordErrorMessage(null)
    }, [ show ])

    const hasErrors = (errors) => {
        const {nameError, emailError, passwordError, repeatPasswordError, userError, role} = errors

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

        if (role) {
            errorToast(role)
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
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            placeholder='Nombre de usuario'
                            onChange={(event) => {setName(event.target.value), setNameErrorMessage(null)}}
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
                            placeholder="Correo electronico"
                            value={email}
                            onChange={(event) => {setEmail(event.target.value), setEmailErrorMessage(null)}}
                            className={emailErrorMessage && "border border-danger border-3"}
                        />
                        {emailErrorMessage && <Form.Label>{emailErrorMessage}</Form.Label>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Contraseña</Form.Label>
                
                        <Form.Control
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(event) => {setPassword(event.target.value), setPasswordErrorMessage(null)}}
                            className={passwordErrorMessage && "border border-danger border-3"}
                        />
                        {passwordErrorMessage && <Form.Label>{passwordErrorMessage}</Form.Label>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Confirmar contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirmar contraseña"
                            value={repeatPassword}
                            onChange={(event) => {setRepeatPassword(event.target.value), setRepeatPasswordErrorMessage(null)}}
                            className={repeatPasswordErrorMessage && "border border-danger border-3"}
                        />
                        {repeatPasswordErrorMessage && <Form.Label>{repeatPasswordErrorMessage}</Form.Label>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Rol</Form.Label>
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

export default CreateUser;