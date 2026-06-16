import { Card, Row } from "react-bootstrap";

const AuthContainer = ({ children }) => {
  return (
    <Card
      className="p-3 px-5 shadow"
      style={{ minWidth: "500px", maxWidth: "500px", maxHeight: "90%", backgroundColor: "var(--secondary)", color: "var(--white)", overflowY: "auto", scrollbarWidth: "none" }}
    >
      <Card.Body>
        {children}
      </Card.Body>
    </Card>
  );
};

export default AuthContainer;