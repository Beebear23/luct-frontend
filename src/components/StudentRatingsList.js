// src/components/StudentRatingsList.js
import React, { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const StudentRatingsList = ({ studentId }) => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/${studentId}/ratings`);
        const data = await res.json();
        setRatings(data);
      } catch (err) {
        console.error('Failed to load ratings:', err);
      }
    };
    fetchRatings();
  }, [studentId]);

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>My Ratings</Card.Title>
        {ratings.length === 0 ? (
          <p>You haven't rated any lectures yet.</p>
        ) : (
          <ListGroup variant="flush">
            {ratings.map((r) => (
              <ListGroup.Item key={r.id}>
                <strong>{r.lecture_name}</strong> ({r.course_name})<br />
                ⭐ {r.rating}/5 — "{r.comment}"
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
};

export default StudentRatingsList;