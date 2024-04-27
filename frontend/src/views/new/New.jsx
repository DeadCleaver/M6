import React, { useCallback, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

const NewBlogPost = ({authors}) => {



  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [readTime, setReadTime] = useState(0);

  const authorsUrl = "http://localhost:3001/authors/";
  const postsUrl = "http://localhost:3001/blogPosts/";

  const handleChange = useCallback((value) => {
    setText(draftToHtml(value));
    console.log(text);
    // console.log(convertToRaw(value.getCurrentContent()))
  });

  /* funzione per recuperare la lista degli autori */
  /* const getAuthors = async () => {
    try {
      const response = await fetch(authorsUrl);

      if (!response.ok) {
        throw new Error("Failed loading authors");
      }

      const authorsData = await response.json();
      setAuthors(authorsData);
    } catch (error) {
      alert(`Error fetching authors: ` + error);
    }
  };

  useEffect(() => {
    getAuthors();
  }, []); */

  return (
    <Container className="new-blog-container">
      <Form className="mt-5">
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control size="lg" placeholder="Title" />
        </Form.Group>

        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control size="lg" as="select">
            <option value="Sci-fi">Sci-fi</option>
            <option value="Economics">Economics</option>
            <option value="Music">Music</option>
            <option value="Movies">Movies</option>
            <option value="Gastronomy">Gastronomy</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="blog-author" className="mt-3">
          <Form.Label>Autore</Form.Label>
          <Form.Control size="lg" as="select">
            {authors.map((author) => (
              <option key={author._id} value={author._id}>
                {author.name} {author.lastname} - {author.email}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Contenuto del post</Form.Label>
          <Editor
            value={text}
            onChange={handleChange}
            className="new-blog-content"
          />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="sm" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="sm"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Invia
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
