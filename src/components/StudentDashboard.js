// src/components/StudentDashboard.js
import React, { useState } from 'react';
import StudentLogin from './StudentLogin';
import StudentRegister from './StudentRegister';
import StudentRating from './StudentRating';

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  if (!student) {
    return isRegistering ? (
      <StudentRegister
        onRegisterSuccess={s => setStudent(s)}
        onSwitch={() => setIsRegistering(false)}
      />
    ) : (
      <StudentLogin
        onLoginSuccess={s => setStudent(s)}
        onSwitch={() => setIsRegistering(true)}
      />
    );
  }

  // Only show rating form (no monitoring/ratings list)
  return (
    <div>
      <h2>Welcome, {student.name}</h2>
      
      {/* Monitoring - Simple placeholder */}
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Monitoring</h5>
          <p className="card-text">View your attendance and class info here.</p>
        </div>
      </div>
      
      {/* Rating - Only submission form */}
      <StudentRating studentId={student.id} />
    </div>
  );
};

export default StudentDashboard;