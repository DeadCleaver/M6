import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, Stack } from "react-bootstrap";
import GoogleLogin from "../googlelogin/GoogleLogin";
import { UserContext } from "../../context/UserContextProvider";

const LoginModal = ({ show, setShow, userLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserToken } = useContext(UserContext);


  useEffect(() => {
    setShow(show);
  }, [show]);

  useEffect(() => {
    if (!show) {
      setEmail("");
      setPassword("");
    }
  }, [show]);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { user, token } = data;

        // salva il token sia nel local storage che nel context
        localStorage.setItem("token", token);
        setUserToken(token)

        userLogin();
        toggleShowLogin();

        console.log("Login eseguito come: ", user);
        alert("Login eseguito correttamente");
      } else {
        console.error("Login fallito");
      }
    } catch (error) {
      console.error("Errore nel login:", error);
    }
  };

  const toggleShowLogin = () => {
    setShow(!show);
  };

  return (
    <Modal show={show} onHide={toggleShowLogin}>
      <Modal.Header closeButton>
        <Modal.Title>Log in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="form-user-email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              placeholder="Inserisci l'email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="form-user-password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Inserisci la password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
        <hr />
        <div className="d-flex justify-content-center">
          <GoogleLogin />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleShowLogin}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleLogin(email, password)}>
          Log in
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
