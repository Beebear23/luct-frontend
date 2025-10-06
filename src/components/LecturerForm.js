import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const LecturerForm = ({ onSubmitted }) => {
  const [formData, setFormData] = useState({
    faculty_name: '',
    class_name: '',
    week_of_reporting: '',
    date_of_lecture: '',
    course_name: '',
    course_code: '',
    lecturer_name: '',
    actual_students_present: '',
    total_registered_students: '',
    venue: '',
    scheduled_time: '',
    topic: '',
    outcomes: '',
    recommendations: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/api/lecture/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      alert('Report submitted!');

      // Reset form
      setFormData({
        faculty_name: '',
        class_name: '',
        week_of_reporting: '',
        date_of_lecture: '',
        course_name: '',
        course_code: '',
        lecturer_name: '',
        actual_students_present: '',
        total_registered_students: '',
        venue: '',
        scheduled_time: '',
        topic: '',
        outcomes: '',
        recommendations: '',
      });

      if (onSubmitted) onSubmitted();
    } catch (err) {
      console.error('Error submitting report:', err);
      alert('Error submitting report');
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Submit Lecturer Report</Card.Title>
        <Form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <Form.Group className="mb-2" key={key}>
              <Form.Label>{key.replace(/_/g, ' ')}</Form.Label>
              {key === 'outcomes' || key === 'recommendations' ? (
                <Form.Control
                  as="textarea"
                  rows={2}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                />
              ) : (
                <Form.Control
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                />
              )}
            </Form.Group>
          ))}
          <Button type="submit">Submit Report</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default LecturerForm;
