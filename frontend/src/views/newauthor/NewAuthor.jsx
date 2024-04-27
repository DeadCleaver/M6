import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Table,
  Modal,
  InputGroup,
} from "react-bootstrap";
import "./style.css";

export default function NewAuthor({ authors, getAuthors }) {

  const [show, setShow] = useState(false);

  const authorApi = "http://localhost:3001/authors";

  const [authorName, setAuthorName] = useState("");
  const [authorLastname, setAutorLastname] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [authorBirthdate, setAuthorBirthdate] = useState(new Date());

  const handleClose = () => setShow(false);
  const handleAddAuthor = () => {
    setShow(true);
  };

  const addAuthor = async () => {
    try {
      const response = await fetch(`${authorApi}`, {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: authorName,
            lastname: authorLastname,
            email: authorEmail,
            birthdate: authorBirthdate,
            avatar: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add author");
      }

      setShow(false);

    } catch (error) {
      alert("Error adding comment:", error);
    }
  };

  useEffect(() => {
    getAuthors();
  }, [authors]);


  return (
    <Container className="new-author-container">
      <div className="d-flex justify-content-center">
        <Button variant="success" onClick={handleAddAuthor} className="my-3">
          Aggiungi autore
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi autore</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="author-name" className="mt-1">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                size="md"
                onChange={(e) => setAuthorName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="author-lastname" className="mt-1">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                size="md"
                onChange={(e) => setAutorLastname(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="author-email" className="mt-1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                size="md"
                onChange={(e) => setAuthorEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="author-birthdate" className="mt-1">
              <Form.Label>Data di Nascita</Form.Label>
              <Form.Control
                size="md"
                type="date"
                onChange={(e) => setAuthorBirthdate(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="author-avatar" className="mt-1">
              <Form.Label>Avatar</Form.Label>
              <Form.Control size="md" type="file" />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addAuthor}>
            Aggiungi
          </Button>
        </Modal.Footer>
      </Modal>

      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cognome</th>
              <th>Email</th>
              <th>Data di Nascita</th>
              <th>Avatar</th>
              <th className="text-center">Opzioni</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author._id}>
                <td>{author.name}</td>
                <td>{author.lastname}</td>
                <td>{author.email}</td>
                <td>{author.birthdate}</td>
                <td>
                  <img
                    src={author.avatar}
                    alt={`${author.name} ${author.lastname}`}
                    className="img-fluid"
                    style={{ maxWidth: "100px" }}
                  />
                </td>
                <td className="text-center">
                  <Button variant="info" size="sm" className="mr-2">
                    Modifica
                  </Button>{" "}
                  <Button variant="danger" size="sm">
                    Rimuovi
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Container>
  );
}
