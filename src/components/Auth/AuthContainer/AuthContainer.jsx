import { Card, Row } from "react-bootstrap";

const AuthContainer = ({ children }) => {
  return (
    <Card
      className="p-3 px-5 shadow"
      style={{ maxWidth: "500px", backgroundColor: "var(--secondary)", color: "var(--white)" }}
    >
      <Card.Body>
        {children}
      </Card.Body>
    </Card>
  );
};

export default AuthContainer;