// src/components/PLMonitoring.js
import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

const PLMonitoring = () => {
  const [stats, setStats] = useState({ totalStudents: 0, totalClasses: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/pl/monitoring');
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error('Failed to load stats:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Monitoring</Card.Title>
        <p>📊 Total Students: {stats.totalStudents}</p>
        <p>📚 Total Classes: {stats.totalClasses}</p>
      </Card.Body>
    </Card>
  );
};

export default PLMonitoring;