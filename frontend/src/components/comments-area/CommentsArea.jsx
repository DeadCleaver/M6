import React from "react";
import { Container, Card } from "react-bootstrap";
import "./CommentsArea.css";
import SingleComment from "./single-comment/SingleComment";
import { useEffect, useState } from "react";
import AddComment from "./add-comment/AddComment";

export default function CommentsArea({ blogId }) {

  const [comments, setComments] = useState([]);
  const blogApi = process.env.REACT_APP_API;

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    try {
      const response = await fetch(`${blogApi}blogPosts/${blogId}/comments`);
      if (!response.ok) {
        throw new Error("Errore durante il recupero dei commenti");
      }
      const data = await response.json();
      setComments(data.comments);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Card className="strive-style">
        <Card.Title className="m-2">Commenti</Card.Title>
      </Card>
      <div>
        {comments.map((comment, index) => (
          <SingleComment key={index} comment={comment} />
        ))}
      </div>
      <div>
        <AddComment blogId={blogId} getComments={getComments}/>
      </div>
    </Container>
  );
}
