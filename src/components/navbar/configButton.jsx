import { useState } from 'react'
import { ButtonGroup, Button, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { GearFill, Moon, Translate, BoxArrowRight } from 'react-bootstrap-icons';
import ToggleTheme from '../services/theme/toggleTheme/Toggletheme';

const ConfigButton = ({onLogout}) => {
    const [isDark, setIsDark] = useState(false)

    const handleDark = () => {
        setIsDark(!isDark)
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
                        <span><Moon />Modo oscuro</span>
                        <ToggleTheme/>
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