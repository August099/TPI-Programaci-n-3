import { useState } from 'react'
import { ButtonGroup, Button, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { GearFill, Moon, Translate, BoxArrowRight } from 'react-bootstrap-icons';

const ConfigButton = ({onLogout}) => {
    const [isDark, setIsDark] = useState(false)
    const [lang, setLang] = useState('es')

    const handleDark = () => {
        setIsDark(!isDark)
    }

    const handleLang = (l) => {
        setLang(l)
    }

    const handleLogOut = () => {
        onLogout()
    }

    return (
        <>
            <Dropdown autoClose="outside">
                <Dropdown.Toggle className='border-0' bsPrefix="btn" style={{backgroundColor: "transparent"}}>
                    <GearFill size={20} color='var(--white)' />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item
                        as="div"
                        className="d-flex justify-content-between align-items-center dropdown-item-setting"
                    >
                        <span><Moon /> Modo oscuro</span>
                        <Form.Check 
                            className='ms-2'
                            type="switch" 
                            checked={isDark} 
                            onChange={handleDark}
                        />
                    </Dropdown.Item>
                    <Dropdown.Item
                        as="div"
                        className="d-flex justify-content-between align-items-center dropdown-item-setting"
                    >
                        <span><Translate /> Idioma</span>
                        <ButtonGroup size="sm">
                            <Button variant={lang === 'es' ? 'secondary' : 'outline-secondary'} onClick={() => handleLang('es')}>ES</Button>
                            <Button variant={lang === 'en' ? 'secondary' : 'outline-secondary'} onClick={() => handleLang('en')}>EN</Button>
                        </ButtonGroup>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                        as="div"
                        className="d-flex justify-content-between align-items-center dropdown-item-setting"
                    >
                        <Button className='bg-transparent border-0 text-danger' onClick={handleLogOut}>
                            <BoxArrowRight /> Cerrar sesión
                        </Button>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
}

export default ConfigButton;