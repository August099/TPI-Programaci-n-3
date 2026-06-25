import { useContext } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { ThemeContext } from "../theme.context";
import { LIGHT_THEME } from "../consts";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  console.log(theme)
  return (
    <Form.Check 
        className='ms-2'
        type="switch" 
        checked={theme !== "ligth"} 
        onChange={toggleTheme}
    />
  );
};

export default ToggleTheme;
