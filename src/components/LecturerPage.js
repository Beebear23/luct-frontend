// src/components/LecturerPage.js
import React, { useState, useEffect } from 'react';
import LecturerForm from './LecturerForm';
import ReportList from './ReportList';
import LecturerClasses from './LecturerClasses';
import LecturerRatings from './LecturerRatings';


const LecturerMonitoring = () => (
  <div className="mb-4">
    <h4>Monitoring</h4>
    <p>Attendance and class performance will appear here.</p>
  </div>
);

const LecturerPage = () => {
  const [reports, setReports] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const lecturerName = "Palesa Ntho";

  // Fetch reports whenever lastUpdated changes
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/lecture/reports');
        const data = await res.json();
        setReports(data);
      } catch (err) {
        console.error('Fetch reports error:', err);
      }
    };
    fetchReports();
  }, [lastUpdated]);

  // Trigger refresh from child component
  const handleRefresh = () => {
    setLastUpdated(Date.now()); // Force re-fetch
  };

  return (
    <div>
      <h2>Lecturer Dashboard</h2>
      
      <LecturerMonitoring />
      
      <h3>My Assigned Classes</h3>
      <LecturerClasses lecturerName={lecturerName} />
      
      <h3>Student Feedback</h3>
      <LecturerRatings lecturerName={lecturerName} />
      
      <hr />
      
      <h3>Submit New Report</h3>
      <LecturerForm onSubmitted={handleRefresh} />
      
      <hr />
      
      <h3>My Reports</h3>
      <ReportList reports={reports} />
    </div>
  );
};

export default LecturerPage;