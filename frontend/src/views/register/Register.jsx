import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const Register = () => {
  const authorApi = `${process.env.REACT_APP_API}authors`;
  const registerApi = "http://localhost:3001/auth/register";

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [userAvatar, setUserAvatar] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch(registerApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        lastname,
        email,
        birthdate,
        password,
        avatar:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      }),
    });

    if (response.ok) {
      // Se la registrazione ha successo, reindirizza l'utente alla pagina di login

      /* aggiunge l'immagine dell'autore, con una funzione a parte SE un file è stato selezionato */
      if (userAvatar) {
        const { _id } = await response.json();
        await uploadAvatar(_id, userAvatar);
      }

      window.location.href = "/";
    } else {
      // Gestisci il caso in cui la registrazione fallisce
      console.error("Registration failed");
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

  return (
    <Container className="border rounded shadow" style={{ marginTop: "120px" }}>
      <h2 className="text-center mt-3" style={{ color: "#00d66f" }}>
        Register
      </h2>
      <Form onSubmit={handleRegister}>
        <Form.Group controlId="formUserName">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            placeholder="..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formUserLastname">
          <Form.Label>Cognome</Form.Label>
          <Form.Control
            placeholder="..."
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formUserEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            placeholder="..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formUserBirthdate">
          <Form.Label>Data di Nascita</Form.Label>
          <Form.Control
            type="date"
            value={birthdate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formUserPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formUserAvatar" className="mt-1">
          <Form.Label>Avatar</Form.Label>
          <Form.Control
            size="md"
            type="file"
            onChange={(e) => setUserAvatar(e.target.files[0])}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="my-3">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
