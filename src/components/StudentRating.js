import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const StudentRating = ({ studentId }) => {
  const [lectureName, setLectureName] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!lectureName || !rating) {
      return alert('Please enter lecture name and rating');
    }

    // 🟡 Add this line HERE — right before the fetch()
    console.log('Submitting rating:', {
      student_id: studentId,
      lecture_name: lectureName,
      rating,
      comment
    });

    try {
      const res = await fetch('/student/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: studentId,
          lecture_name: lectureName,
          rating,
          comment
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Rating submitted successfully!');
        setLectureName('');
        setRating('');
        setComment('');
      } else {
        alert('❌ Failed to submit rating: ' + data.error);
      }
    } catch (err) {
      console.error('Error submitting rating:', err);
      alert('Error submitting rating');
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Rate Your Lecture</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Lecture Name</Form.Label>
            <Form.Control
              type="text"
              value={lectureName}
              onChange={(e) => setLectureName(e.target.value)}
              placeholder="Enter lecture name (exactly as in database)"
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Rating (1–5)</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>

          <Button type="submit">Submit Rating</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default StudentRating;
