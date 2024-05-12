import React from 'react';
import { Card } from 'react-bootstrap';
import BlogAuthor from '../../blog/blog-author/BlogAuthor';

export default function SingleComment({comment}) {

  const { user } = comment;
    
  return (
   <Card className='my-2'>
    <Card.Body>
        <Card.Subtitle><BlogAuthor {...user} /></Card.Subtitle>
        <Card.Text className='mt-1'>
          {comment.comment}
        </Card.Text>
      </Card.Body>
   </Card>
  )
}
