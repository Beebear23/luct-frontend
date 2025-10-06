// src/components/StudentRegister.js
import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const StudentRegister = ({ onRegisterSuccess, onSwitch }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !studentNumber) {
      return setError('All fields are required');
    }

    try {
      const res = await fetch('http://localhost:5000/api/student/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          email, 
          student_number: studentNumber.trim() 
        })
      });

      const data = await res.json();

      if (res.ok) {
        onRegisterSuccess(data);
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Network error. Please try again.');
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Student Register</Card.Title>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={e => setName(e.target.value)}
              isInvalid={!!error && !name}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              isInvalid={!!error && !email}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Student Number</Form.Label>
            <Form.Control
              value={studentNumber}
              onChange={e => setStudentNumber(e.target.value)}
              isInvalid={!!error && !studentNumber}
            />
          </Form.Group>
          <Button type="submit">Register</Button>{' '}
          <Button variant="link" onClick={onSwitch}>Already have an account? Login</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default StudentRegister;