// src/components/PRLReportList.js
import React, { useEffect, useState } from 'react';
import { Card, Button, Form, Modal } from 'react-bootstrap';
import * as XLSX from 'xlsx';

const PRLReportList = () => {
  const [reports, setReports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [currentReportId, setCurrentReportId] = useState(null);

  const fetchReports = async () => {
    const res = await fetch('/api/lecture/reports');
    const data = await res.json();
    setReports(data);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleOpenModal = (id) => {
    setCurrentReportId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setFeedback('');
    setCurrentReportId(null);
    setShowModal(false);
  };

  const handleSubmitFeedback = async () => {
    if (!feedback) return alert('Feedback cannot be empty');
    const res = await fetch(`/api/lecture/report/${currentReportId}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ feedback })
    });
    if (res.ok) {
      alert('Feedback submitted!');
      fetchReports();
      handleCloseModal();
    } else {
      alert('Error submitting feedback');
    }
  };

  const exportToExcel = () => {
    const worksheetData = reports.map(report => ({
      'Course': report.course_name,
      'Topic': report.topic,
      'Date': new Date(report.date_of_lecture).toLocaleDateString(),
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
    XLSX.utils.book_append_sheet(workbook, worksheet, "PRL Reports");
    XLSX.writeFile(workbook, "PRL_Reports.xlsx");
  };

  return (
    <div>
      <div className="mb-3">
        <Button variant="success" onClick={exportToExcel}>
          📥 Export to Excel
        </Button>
      </div>
      
      <h3>Lecturer Reports</h3>
      {reports.length === 0 && <p>No reports yet.</p>}
      {reports.map(r => (
        <Card key={r.id} className="mb-2">
          <Card.Body>
            <Card.Title>{r.course_name} - {r.topic}</Card.Title>
            <Card.Text>
              <strong>Date:</strong> {new Date(r.date_of_lecture).toLocaleDateString()}<br/>
              <strong>Faculty:</strong> {r.faculty_name}<br/>
              <strong>Class:</strong> {r.class_name}<br/>
              <strong>Students Present:</strong> {r.actual_students_present} / {r.total_registered_students}<br/>
              <strong>Venue:</strong> {r.venue}<br/>
              <strong>Scheduled Time:</strong> {r.scheduled_time}<br/>
              <strong>Outcomes:</strong> {r.outcomes}<br/>
              <strong>Recommendations:</strong> {r.recommendations}<br/>
              <strong>PRL Feedback:</strong> {r.prl_feedback || 'No feedback yet'}
            </Card.Text>
            <Button onClick={() => handleOpenModal(r.id)}>Add Feedback</Button>
          </Card.Body>
        </Card>
      ))}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Feedback</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmitFeedback}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PRLReportList;