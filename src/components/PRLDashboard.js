// src/components/PRLDashboard.js
import React from 'react';
import PRLMonitoring from './PRLMonitoring';
import PRLCourseList from './PRLCourseList';
import PRLClasses from './PRLClasses';
import PRLRatings from './PRLRatings';
import PRLReportList from './PRLReportList';

const PRLDashboard = () => {
  return (
    <div>
      <h2>PRL Dashboard</h2>
      
      <PRLMonitoring />
      
      <PRLCourseList />
      
      <PRLClasses />
      
      <PRLRatings />
      
      <hr />
      <h3>Lecturer Reports</h3>
      <PRLReportList />
    </div>
  );
};

export default PRLDashboard;