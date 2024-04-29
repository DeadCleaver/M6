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
  const [authorAvatar, setAuthorAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAuthorId, setEditingAuthorId] = useState(null);

  const handleClose = () => {
    setShow(false);
    setIsEditing(false);
    setAuthorName("");
    setAutorLastname("");
    setAuthorEmail("");
    setAuthorBirthdate(null);
    setAuthorAvatar(null);
  };

  const handleAddAuthor = () => {
    setIsEditing(false);
    setShow(true);
    console.log("edit", isEditing);
  };

  const handleEditAuthor = (authorId) => {
    setShow(true); // Apri il modale di modifica
    setIsEditing(true);
    setEditingAuthorId(authorId); // Imposta l'ID dell'autore che si sta modificando
    const authorToEdit = authors.find((author) => author._id === authorId);
    setAuthorName(authorToEdit.name);
    setAutorLastname(authorToEdit.lastname);
    setAuthorEmail(authorToEdit.email);
    setAuthorBirthdate(authorToEdit.birthdate);
    setAvatarUrl(authorToEdit.avatar);
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
          avatar:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add author");
      }

      /* aggiunge l'immagine dell'autore, con una funzione a parte SE un file è stato selezionato */
      if (authorAvatar) {
        const { _id } = await response.json();
        await uploadAvatar(_id, authorAvatar);
      }

      setAuthorName("");
      setAutorLastname("");
      setAuthorEmail("");
      setAuthorBirthdate(null);
      setAuthorAvatar(null);

      setShow(false);
    } catch (error) {
      alert("Error adding comment:", error);
    }
  };

  const uploadAvatar = async (authorId, avatarFile) => {
    try {
      const avatarData = new FormData();
      avatarData.append("avatar", avatarFile);

      const response = await fetch(`${authorApi}/${authorId}/avatar`, {
        method: "PATCH",
        body: avatarData,
      });

      if (!response.ok) {
        throw new Error("Failed to add avatar image");
      }

      const { avatar } = await response.json();
      alert("Avatar image added successfully:", avatar);
    } catch (error) {
      console.error("Error adding avatar image:", error);
    }
  };

  const deleteAuthor = async (authorId) => {
    try {
      const response = await fetch(`${authorApi}/${authorId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete author");
      }

      getAuthors();
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };

  const editAuthor = async (authorId) => {
    try {
      const response = await fetch(`${authorApi}/${authorId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: authorName,
          lastname: authorLastname,
          email: authorEmail,
          birthdate: authorBirthdate,
          avatar: avatarUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to edit author");
      }

      /* aggiunge l'immagine dell'autore, con una funzione a parte SE un file è stato selezionato */
      if (authorAvatar) {
        const { _id } = await response.json();
        await uploadAvatar(_id, authorAvatar);
      }

      // Chiudi il modale dopo la modifica
      setShow(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Error editing author:", error);
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
          <Modal.Title>
            {isEditing ? "Modifica autore" : "Aggiungi autore"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isEditing ? (
            <Form>
              <Form.Group controlId="author-name" className="mt-1">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  size="md"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="author-lastname" className="mt-1">
                <Form.Label>Cognome</Form.Label>
                <Form.Control
                  size="md"
                  value={authorLastname}
                  onChange={(e) => setAutorLastname(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="author-email" className="mt-1">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  size="md"
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="author-birthdate" className="mt-1">
                <Form.Label>Data di Nascita</Form.Label>
                <Form.Control
                  size="md"
                  type="date"
                  value={authorBirthdate}
                  onChange={(e) => setAuthorBirthdate(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="author-avatar" className="mt-1">
                <Form.Label>Avatar</Form.Label>
                <Form.Control
                  size="md"
                  type="file"
                  onChange={(e) => setAuthorAvatar(e.target.files[0])}
                />
              </Form.Group>
            </Form>
          ) : (
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
                <Form.Control
                  size="md"
                  type="file"
                  onChange={(e) => setAuthorAvatar(e.target.files[0])}
                />
              </Form.Group>
            </Form>
          )}
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={isEditing ? () => editAuthor(editingAuthorId) : addAuthor}
          >
            {isEditing ? "Salva modifiche" : "Aggiungi"}
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
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleEditAuthor(author._id)}
                    className="mr-2"
                  >
                    Modifica
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteAuthor(author._id)}
                  >
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
