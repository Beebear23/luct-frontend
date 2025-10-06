// src/components/LecturerRatings.js
import React, { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const LecturerRatings = ({ lecturerName }) => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/lecture/ratings/${encodeURIComponent(lecturerName)}`);
        const data = await res.json();
        console.log('Ratings data:', data); // 👈 ADD THIS
        setRatings(data);
      } catch (err) {
        console.error('Error fetching ratings:', err);
      }
    };
    fetchRatings();
  }, [lecturerName]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Student Ratings</Card.Title>
        {ratings.length === 0 ? (
          <p>No ratings yet. Debug: Check console for data.</p> // 👈 TEMP MESSAGE
        ) : (
          <ListGroup variant="flush">
            {ratings.map((r, index) => (
              <ListGroup.Item key={index}>
                <strong>{r.lecture_name}</strong> by {r.student_name}<br />
                ⭐ {r.rating}/5 — "{r.comment}"
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
};

export default LecturerRatings;