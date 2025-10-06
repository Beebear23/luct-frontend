// src/components/PLReportList.js
import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import * as XLSX from 'xlsx';

const PLReportList = () => {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const res = await fetch('/api/pl/reports');
      const data = await res.json();
      setReports(data);
    } catch (err) {
      console.error('Error fetching PL reports:', err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const exportToExcel = () => {
    const worksheetData = reports.map(report => ({
      'Course': report.course_name,
      'Topic': report.topic,
      'Date': new Date(report.date_of_lecture).toLocaleDateString(),
      'Lecturer': report.lecturer_name,
      'Faculty': report.faculty_name,
      'Class': report.class_name,
      'Students Present': `${report.actual_students_present} / ${report.total_registered_students}`,
      'Venue': report.venue,
      'Scheduled Time': report.scheduled_time,
      'Outcomes': report.outcomes,
      'Recommendations': report.recommendations,
      'PRL Feedback': report.prl_feedback || 'No feedback'
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "PL Reports");
    XLSX.writeFile(workbook, "PL_Reports.xlsx");
  };

  return (
    <div>
      <div className="mb-3">
        <Button variant="success" onClick={exportToExcel}>
          📥 Export to Excel
        </Button>
      </div>
      
      <h3>Reports (with PRL Feedback)</h3>
      {reports.length === 0 && <p>No reports yet.</p>}
      {reports.map(r => (
        <Card key={r.id} className="mb-2">
          <Card.Body>
            <Card.Title>{r.course_name} - {r.topic}</Card.Title>
            <Card.Text>
              <strong>Date:</strong> {new Date(r.date_of_lecture).toLocaleDateString()}<br />
              <strong>Lecturer:</strong> {r.lecturer_name}<br />
              <strong>Faculty:</strong> {r.faculty_name}<br />
              <strong>Class:</strong> {r.class_name}<br />
              <strong>Students Present:</strong> {r.actual_students_present} / {r.total_registered_students}<br />
              <strong>Venue:</strong> {r.venue}<br />
              <strong>Scheduled Time:</strong> {r.scheduled_time}<br />
              <strong>Outcomes:</strong> {r.outcomes}<br />
              <strong>Recommendations:</strong> {r.recommendations}<br />
              <strong>PRL Feedback:</strong> {r.prl_feedback || 'No feedback yet'}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default PLReportList;