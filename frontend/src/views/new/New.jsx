import React, { useCallback, useEffect, useState, useContext } from "react";
import { Button, Container, Form, InputGroup, Input } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { UserContext } from "../../context/UserContextProvider";
import { Navigate } from "react-router-dom";


const NewBlogPost = ({ authors, getPosts }) => {
  const [postCategory, setPostCategory] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postCover, setPostCover] = useState(null); //la cover non è obbligatoria
  const [readTime, setReadTime] = useState(null);
  const [text, setText] = useState("");
  const [authorId, setAuthorId] = useState("");


/*   const postsUrl = "http://localhost:3001/blogPosts/"; */
/* const postsUrl = `${process.env.REACT_APP_API}blogPosts/`;*/

  /* const token = localStorage.getItem('token'); */

  const { userToken } = useContext(UserContext);

  const categories = [
    "Sci-fi",
    "Fantasy",
    "Economics",
    "Music",
    "Movies",
    "Gastronomy",
    "Astrology",
  ];

  useEffect(() =>{
    getAuthorData();
  }, []);

  /* recupera l'id dell'autore */
  const getAuthorData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/author/me`, {
        headers: {
          Authorization: `Bearer ${userToken}`, 
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch author data");
      }
      const { _id } = await response.json();
      setAuthorId(_id); 
    } catch (error) {
      console.error("Error fetching author data:", error);
    }
  };

  const handleChange = useCallback((value) => {
    setText(draftToHtml(value));
    console.log(text);
    // console.log(convertToRaw(value.getCurrentContent()))
  });

   const createPost = async () => {

    try {
      const response = await fetch(`${process.env.REACT_APP_API}blogPosts/`, {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          category: postCategory,
          title: postTitle,
          readingtime: {
            value: readTime,
            unit: "minutes",
          },
          author: authorId, // Invia solo l'ID dell'autore anziché l'intero oggetto autore
          content: text,
          cover: `https://media.foundit.in/career-advice/wp-content/uploads/2021/08/1563859193.jpg`
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add post");
      } 

      /* aggiunge l'immagine del post, con una funzione a parte SE un file è stato selezionato */
      if (postCover) {
        const { _id } = await response.json();
        await uploadCover(_id, postCover);
      }

      setPostCategory("");
      setPostTitle("");
      setReadTime("");

      getPosts();

      return <Navigate to="/" />;
    } catch (error) {
      alert("Error adding post:", error);
      console.log("Error adding post:", error)
    }
  };

  const uploadCover = async (postId, coverFile) => {
    try {
      const coverData = new FormData();
      coverData.append("cover", coverFile);

      const response = await fetch(`${process.env.REACT_APP_API}blogPosts/${postId}/cover`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
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
