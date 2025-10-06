// src/components/PRLCourseList.js
import React, { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const PRLCourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/prl/courses')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        console.log('Courses loaded:', data);
        setCourses(data);
      })
      .catch(err => {
        console.error('Failed to load courses:', err);
      });
  }, []);

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>
          📚 Courses Under Your Stream ({courses.length})
        </Card.Title>
        {courses.length > 0 ? (
          <ListGroup variant="flush">
            {courses.map(c => (
              <ListGroup.Item key={c.id}>
                <strong>{c.course_name}</strong> by {c.lecturer_name} ({c.lecture_count} lectures)
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>Loading courses...</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default PRLCourseList;