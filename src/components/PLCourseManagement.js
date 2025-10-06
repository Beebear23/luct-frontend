// src/components/PLCourseManagement.js
import React, { useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';


const PLCourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [lecturerName, setLecturerName] = useState('');

  // Fetch courses for display
  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/courses');
      if (!res.ok) throw new Error('Failed to fetch courses');
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Add course
  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!courseName || !lecturerName) return alert('Enter both course and lecturer');

    try {
      // In handleAddCourse:
     const res = await fetch('http://localhost:5000/api/pl/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course_name: courseName, lecturer_name: lecturerName })
     });

      if (!res.ok) {
        const text = await res.text(); // capture error HTML if returned
        throw new Error(text);
      }

      const addedCourse = await res.json();
      alert(`Course added: ${addedCourse.course_name} (${addedCourse.lecturer_name})`);
      setCourseName('');
      setLecturerName('');
      fetchCourses();
    } catch (err) {
      console.error('Error adding course:', err.message);
      alert('Failed to add course. Check server and route!');
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Add / Assign Course</Card.Title>
        <Form onSubmit={handleAddCourse}>
          <Form.Group className="mb-2">
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              type="text"
              value={courseName}
              onChange={e => setCourseName(e.target.value)}
              placeholder="Type course name"
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Lecturer Name</Form.Label>
            <Form.Control
              type="text"
              value={lecturerName}
              onChange={e => setLecturerName(e.target.value)}
              placeholder="Type lecturer name"
            />
          </Form.Group>

          <Button type="submit">Add Course</Button>
        </Form>

        <hr />
        <h5>All Courses</h5>
        {courses.map(c => (
          <p key={c.id}>{c.course_name} - {c.lecturer_name}</p>
        ))}
      </Card.Body>
    </Card>
  );
};

export default PLCourseManagement;
