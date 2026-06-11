import { Card, Row } from "react-bootstrap";

const AuthContainer = ({ children }) => {
  return (
    <Card
      className="mt-4 mx-auto p-3 px-5 shadow"
      style={{ maxWidth: "700px" }}
    >
      <Card.Body>
        <Row className="mb-2">
          <h5>Binevenido a la Ferreteria</h5>
        </Row>

        {children}
      </Card.Body>
    </Card>
  );
};

export default AuthContainer;