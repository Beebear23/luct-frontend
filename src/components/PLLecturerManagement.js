// src/components/PLLectureManagement.js
import React, { useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const PLLectureManagement = () => {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [lectureName, setLectureName] = useState('');
  const [venue, setVenue] = useState('');
  const [time, setTime] = useState('');

  // Fetch courses from PL endpoint
  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/pl/courses');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error('Failed to load courses:', err);
      alert('Failed to load courses. Check console.');
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleAddLecture = async (e) => {
    e.preventDefault();
    if (!courseId || !lectureName) {
      return alert('Please select a course and enter a lecture name.');
    }

    try {
      const res = await fetch('http://localhost:5000/api/pl/lectures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          course_id: courseId,
          lecture_name: lectureName,
          scheduled_time: time,
          venue
        })
      });

      if (!res.ok) throw new Error('Failed to add lecture');

      alert('✅ Lecture added successfully!');
      // Reset form
      setCourseId('');
      setLectureName('');
      setVenue('');
      setTime('');
      // Refresh course list (optional)
    } catch (err) {
      console.error('Error:', err);
      alert('❌ Failed to add lecture. Check console.');
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Add New Lecture</Card.Title>
        <Form onSubmit={handleAddLecture}>
          <Form.Group className="mb-3">
            <Form.Label>Course</Form.Label>
            <Form.Select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
            >
              <option value="">-- Select a course --</option>
              {courses.length === 0 ? (
                <option disabled>No courses available</option>
              ) : (
                courses.map((c) => (
                  <option key={c.id} value={String(c.id)}>
                    {c.course_name} ({c.lecturer_name})
                  </option>
                ))
              )}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Lecture Name</Form.Label>
            <Form.Control
              type="text"
              value={lectureName}
              onChange={(e) => setLectureName(e.target.value)}
              placeholder="e.g., Introduction to Databases"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Venue</Form.Label>
            <Form.Control
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              placeholder="e.g., Hall 6"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Scheduled Time</Form.Label>
            <Form.Control
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Lecture
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PLLectureManagement;