import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

export default function AddComment({blogId, getComments}) {

  const [newComment, setNewComment] = useState("");
  const blogApi = process.env.REACT_APP_API;
  const token = localStorage.getItem('token');


  const submitComment = async (event) => {
    event.preventDefault();

    try {
        const response = await fetch(`${blogApi}blogPosts/${blogId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            comment: newComment
          }),
        });
    
        if (!response.ok) {
          throw new Error('Errore durante l\'invio del commento');
        }
    
        setNewComment('');
    
        // aggiornare i commenti con getComments!
        getComments();
    
      } catch (error) {
        alert(error);
        console.log(error);
      }
   
  };


  return (
    <Container>
        <div>Scrivi un Commento</div>
      <Form onSubmit={submitComment}>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
          />
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button
            className="mb-3"
            variant="outline-success"
            type="submit"
            size="sm"
            onClick={submitComment}
          >
            Add Comment
          </Button>
        </div>
      </Form>
    </Container>
  );
}
