// src/components/LecturerClasses.js
import React, { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';


const LecturerClasses = ({ lecturerName }) => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/lecture/classes/${encodeURIComponent(lecturerName)}`);
        if (!res.ok) throw new Error('Failed to load classes');
        const data = await res.json();
        setClasses(data);
      } catch (err) {
        console.error('Error fetching classes:', err);
      }
    };
    fetchClasses();
  }, [lecturerName]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>My Assigned Classes</Card.Title>
        {classes.length === 0 ? (
          <p>No classes assigned yet.</p>
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

export default LecturerClasses;