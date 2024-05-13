import React from "react";
import { Container, Card } from "react-bootstrap";
import "./CommentsArea.css";
import SingleComment from "./single-comment/SingleComment";
import { useEffect, useState } from "react";
import AddComment from "./add-comment/AddComment";

export default function CommentsArea({ blogId }) {

  const [comments, setComments] = useState([]);
  const api = process.env.REACT_APP_API;
  const token = localStorage.getItem('token');
  const [loggedUser, setLoggedUser] = useState(null);


  useEffect(() => {
    getComments();

    if (token) {
      getUserData();
    } else {
      setLoggedUser(null);
    }

  }, []);

  const getComments = async () => {
    try {
      const response = await fetch(`${api}blogPosts/${blogId}/comments`);
      if (!response.ok) {
        throw new Error("Errore durante il recupero dei commenti");
      }
      const data = await response.json();
      setComments(data.comments);
    } catch (error) {
      console.error(error);
    }
  };

  const getUserData = async () => {
    try {
      const response = await fetch(`${api}authors/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Errore durante il recupero dei dati utente');
      }
  
      const userData = await response.json();

      setLoggedUser(userData);

    } catch (error) {
      console.error(error);

      return null;
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(`${api}blogPosts/${blogId}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Errore nella cancellazione del commento");
      }

      getComments();
    } catch (error) {
      alert("Errore nella cancellazione del commento:", error);
    }
  };

const modifyComment = async (commentId, editedComment) => {

    try {
      const response = await fetch(`${api}blogPosts/${blogId}/comments/${commentId}`, {
        method: `PUT`,  
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          comment: editedComment,
          user: loggedUser._id,
      })
    });
  
      if (!response.ok) {
        throw new Error('Errore nella modifica del commento');
      } 
  
      getComments();

    } catch (error) {
      alert('Errore nella modifica del commento:', error);
    }
  ;

  };

  return (
    <Container>
      <Card className="strive-style">
        <Card.Title className="m-2">Commenti</Card.Title>
      </Card>
      <div>
        {comments.map((comment, index) => (
          <SingleComment key={index} comment={comment} userDataId={loggedUser ? loggedUser._id : null} deleteComment={deleteComment} modifyComment={modifyComment} />
        ))}
      </div>
      {token  &&
            <div>
            <AddComment blogId={blogId} getComments={getComments}/>
          </div>}
    </Container>
  );
}
