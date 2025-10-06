// src/components/LecturerPage.js
import React, { useState, useEffect } from 'react';
import LecturerForm from './LecturerForm';
import ReportList from './ReportList';

// Use your actual Render backend URL
const API_BASE = 'https://luct-backend-1.onrender.com';

const LecturerMonitoring = () => (
  <div className="card mb-4">
    <div className="card-body">
      <h5 className="card-title">Monitoring</h5>
      <p className="card-text">Attendance and class performance will appear here.</p>
    </div>
  </div>
);

const LecturerPage = () => {
  const [reports, setReports] = useState([]);
  const [classes, setClasses] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Use the lecturer name that exists in your database
  const lecturerName = "Teboho Talasi"; // Changed from "Palesa Ntho"

  // Fetch all data
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch reports
      const reportsRes = await fetch(`${API_BASE}/api/lecture/reports`);
      const reportsData = await reportsRes.json();
      setReports(reportsData);
      
      // Fetch classes
      const classesRes = await fetch(`${API_BASE}/api/lecture/classes/${encodeURIComponent(lecturerName)}`);
      const classesData = await classesRes.json();
      setClasses(classesData);
      
      // Fetch ratings
      const ratingsRes = await fetch(`${API_BASE}/api/lecture/ratings/${encodeURIComponent(lecturerName)}`);
      const ratingsData = await ratingsRes.json();
      setRatings(ratingsData);
      
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Refresh function for form submission
  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div className="container">
      <h2 className="mb-4">Lecturer Dashboard</h2>
      
      {loading && <div className="alert alert-info">Loading...</div>}
      
      <LecturerMonitoring />
      
      <div className="card mb-4">
        <div className="card-body">
          <h3 className="card-title">My Assigned Classes</h3>
          {classes.length === 0 ? (
            <p className="text-muted">No classes assigned yet.</p>
          ) : (
            <ul className="list-group list-group-flush">
              {classes.map(cls => (
                <li key={cls.id} className="list-group-item">
                  <strong>{cls.lecture_name}</strong> ({cls.course_name})<br />
                  🕒 {cls.scheduled_time} | 📍 {cls.venue}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h3 className="card-title">Student Feedback</h3>
          {ratings.length === 0 ? (
            <p className="text-muted">No ratings yet.</p>
          ) : (
            <ul className="list-group list-group-flush">
              {ratings.map((r, index) => (
                <li key={index} className="list-group-item">
                  <strong>{r.lecture_name}</strong> by {r.student_name}<br />
                  ⭐ {r.rating}/5 — "{r.comment}"
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      <hr />
      
      <div className="card mb-4">
        <div className="card-body">
          <h3 className="card-title">Submit New Report</h3>
          <LecturerForm 
            onSubmitted={handleRefresh} 
            apiBase={API_BASE} // Pass API base to form
          />
        </div>
      </div>
      
      <hr />
      
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">My Reports</h3>
          <ReportList reports={reports} />
        </div>
      </div>
    </div>
  );
};

export default LecturerPage;