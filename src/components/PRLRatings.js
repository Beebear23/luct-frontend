// src/components/PRLRatings.js
import React, { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const PRLRatings = () => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/prl/ratings');
        const data = await res.json();
        setRatings(data);
      } catch (err) {
        console.error('Failed to load ratings:', err);
      }
    };
    fetchRatings();
  }, []);

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Lecture Ratings Overview</Card.Title>
        {ratings.length === 0 ? (
          <p>No ratings yet.</p>
        ) : (
          <ListGroup variant="flush">
            {ratings.map((r, i) => (
              <ListGroup.Item key={i}>
                <strong>{r.lecture_name}</strong> ({r.course_name})<br />
                Taught by: {r.lecturer_name}<br />
                ⭐ {parseFloat(r.avg_rating).toFixed(1)}/5 ({r.rating_count} ratings)
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
};

export default PRLRatings;