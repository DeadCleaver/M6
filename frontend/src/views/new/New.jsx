import React, { useCallback, useEffect, useState } from "react";
import { Button, Container, Form, InputGroup, Input } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

const NewBlogPost = ({ authors }) => {
  const [postCategory, setPostCategory] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postCover, setPostCover] = useState(null); //la cover non è obbligatoria
  const [readTime, setReadTime] = useState(null);
  const [text, setText] = useState("");
  const [authorUser, setAuthorUser] = useState("");
  const [authorAvatar, setAuthorAvatar] = useState("");

  const postsUrl = "http://localhost:3001/blogPosts/";

  const categories = [
    "Sci-fi",
    "Fantasy",
    "Economics",
    "Music",
    "Movies",
    "Gastronomy",
    "Astrology",
  ];

  const handleChange = useCallback((value) => {
    setText(draftToHtml(value));
    console.log(text);
    // console.log(convertToRaw(value.getCurrentContent()))
  });

  const handleAuthorChange = (authorId) => {
    const currentAuthor = authors.find((author) => author._id === authorId);
    setAuthorUser(currentAuthor.name);
    setAuthorAvatar(currentAuthor.avatar);
    console.log(authorUser);
    console.log(authorAvatar);
  };


   const createPost = async () => {

    try {
      const response = await fetch(`${postsUrl}`, {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: postCategory,
          title: postTitle,
          readingtime: {
            value: readTime,
            unit: "minutes",
          },
          author: {
            name: authorUser,
            avatar: authorAvatar,
          },
          content: text,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add author");
      } 

      /* aggiunge l'immagine del post, con una funzione a parte SE un file è stato selezionato */
      if (postCover) {
        const { _id } = await response.json();
        await uploadCover(_id, postCover);
      }

      setPostCategory("");
      setPostTitle("");
      setReadTime("");
      setAuthorUser("");
      setAuthorAvatar("");

    } catch (error) {
      alert("Error adding post:", error);
      console.log("Error adding post:", error)
    }
  };

  const uploadCover = async (postId, coverFile) => {
    try {
      const coverData = new FormData();
      coverData.append("cover", coverFile);

      const response = await fetch(`${postsUrl}/${postId}/cover`, {
        method: "PATCH",
        body: coverData,
      });

      if (!response.ok) {
        throw new Error("Failed to add avatar image");
      }

      const { cover } = await response.json();
      alert("Post image added successfully:", cover);

    } catch (error) {
      console.error("Error adding avatar image:", error);
    }
  };

  return (
    <Container className="new-blog-container">
      <Form className="mt-5">
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control onChange={(e) => setPostTitle(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => setPostCategory(e.target.value)}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="blog-timereading" className="mt-3">
          <Form.Label>Time of reading</Form.Label>
          <InputGroup>
            <InputGroup.Text>minutes</InputGroup.Text>
            <Form.Control
              type="number"
              onChange={(e) => setReadTime(e.target.value)}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="blog-cover" className="mt-3">
          <Form.Label>Article's cover</Form.Label>
          <InputGroup>
            <Form.Control
              size="md"
              type="file"
              onChange={(e) => setPostCover(e.target.files[0])}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="blog-author" className="mt-3">
          <Form.Label>Autore</Form.Label>
          <Form.Control
            size="sm"
            as="select"
            onChange={(e) => handleAuthorChange(e.target.value)}
          >
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
            size="sm"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
            onClick={createPost}
          >
            Invia
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
