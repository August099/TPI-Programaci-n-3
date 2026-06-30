import { useContext } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { ThemeContext } from "../theme.context";
import { LIGHT_THEME } from "../consts";

const ToggleTheme = ({}) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Form.Check 
        className='ms-2'
        type="switch" 
        checked={theme !== LIGHT_THEME} 
        onChange={toggleTheme}
    />
  );
};

export default ToggleTheme;
