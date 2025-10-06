// src/components/StudentLogin.js
import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const StudentLogin = ({ onLoginSuccess, onSwitch }) => {
  const [studentNumber, setStudentNumber] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!studentNumber.trim()) {
      return setError('Please enter your student number');
    }

    try {
      const res = await fetch('/api/student/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_number: studentNumber.trim() })
      });

      const data = await res.json();

      if (res.ok) {
        onLoginSuccess(data.student);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please try again.');
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Student Login</Card.Title>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Student Number</Form.Label>
            <Form.Control
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
              isInvalid={!!error}
            />
          </Form.Group>
          <Button type="submit">Login</Button>{' '}
          <Button variant="link" onClick={onSwitch}>Register</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default StudentLogin;