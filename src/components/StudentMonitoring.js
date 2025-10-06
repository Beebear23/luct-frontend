// src/components/StudentMonitoring.js
import React, { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const StudentMonitoring = ({ studentId }) => {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/${studentId}/lectures`);
        const data = await res.json();
        setLectures(data);
      } catch (err) {
        console.error('Failed to load lectures:', err);
      }
    };
    fetchLectures();
  }, [studentId]);

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>My Classes (Monitoring)</Card.Title>
        {lectures.length === 0 ? (
          <p>No classes assigned yet.</p>
        ) : (
          <ListGroup variant="flush">
            {lectures.map((lec) => (
              <ListGroup.Item key={lec.id}>
                <strong>{lec.lecture_name}</strong> ({lec.course_name})<br />
                🕒 {lec.scheduled_time} | 📍 {lec.venue}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
};

export default StudentMonitoring;