// src/components/LecturerMonitoring.js
import React from 'react';
import { Card } from 'react-bootstrap';

const LecturerMonitoring = () => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Monitoring</Card.Title>
        <p>View your class attendance and performance here.</p>
        {/* Later: Show charts or stats */}
      </Card.Body>
    </Card>
  );
};

export default LecturerMonitoring;