// src/components/PRLClasses.js
import React, { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';


const PRLClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch('/api/prl/classes');
        const data = await res.json();
        setClasses(data);
      } catch (err) {
        console.error('Failed to load classes:', err);
      }
    };
    fetchClasses();
  }, []);

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>All Classes in Stream</Card.Title>
        {classes.length === 0 ? (
          <p>No classes found.</p>
        ) : (
          <ListGroup variant="flush">
            {classes.map(cls => (
              <ListGroup.Item key={cls.id}>
                <strong>{cls.lecture_name}</strong> ({cls.course_name})<br />
                🕒 {cls.scheduled_time} | 📍 {cls.venue}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
};

export default PRLClasses;