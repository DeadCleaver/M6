import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import BlogAuthor from "../../blog/blog-author/BlogAuthor";
import { useState } from "react";

export default function SingleComment({ comment, userDataId, deleteComment, modifyComment }) {
  const { user, _id } = comment;
  const isCurrentUser = userDataId && user && userDataId === user._id;

  /* per la modifica del commento */
  const [editMode, setEditMode] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedComment(comment.comment);
  }

  /* handleModifyComment */
  const handleModifyComment = (commentId) => {
    modifyComment(commentId, editedComment)
    setEditMode(false);
  }

  return (
    <Card className="my-2">
      <Card.Body>
        <Card.Subtitle>
          <BlogAuthor {...user} />
        </Card.Subtitle>

        {editMode ? (
          <Form>
            <Form.Control
              type="text"
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
            />
             <div className="d-flex justify-content-end mt-1">
              <Button variant="outline-warning" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                className="ms-2"
                variant="outline-success"
                size="sm"
                onClick={() => handleModifyComment(comment._id)}
              >
                Save
              </Button>
            </div>
          </Form>
        ) : (
          <div>
          <Card.Text className="mt-1">{comment.comment}</Card.Text>
          {isCurrentUser && (
            <div className="d-flex justify-content-end">
              <Button variant="outline-warning" size="sm" onClick={handleEdit}>
                Modifica
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => deleteComment(comment._id)}
                className="ms-2"
              >
                Elimina
              </Button>
            </div>
          )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
