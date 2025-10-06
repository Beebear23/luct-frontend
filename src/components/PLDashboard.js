// src/components/PLDashboard.js
import React from 'react';
import PLMonitoring from './PLMonitoring';
import PLClasses from './PLClasses';
import PLRatings from './PLRatings';
import PLReportList from './PLReportList';
import PLCourseManagement from './PLCourseManagement';
import PLLectureManagement from './PLLecturerManagement';

const PLDashboard = () => {
  return (
    <div>
      <h2>Program Leader Dashboard</h2>
      
      <PLMonitoring />
      
      <PLClasses />
      
      <PLRatings />
      
      <PLReportList />
      
      <hr />
      <h3>Course Management</h3>
      <PLCourseManagement />
      
      <hr />
      <h3>Lecture Management</h3>
      <PLLectureManagement />
    </div>
  );
};

export default PLDashboard;