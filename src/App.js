import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import './App.css';

// Import full dashboard pages (not just forms!)
import LecturerPage from './components/LecturerPage';       // ✅ Full lecturer dashboard
import PRLDashboard from './components/PRLDashboard';       // ✅ You have this!
import PLDashboard from './components/PLDashboard';         // ✅ You have this!
import StudentDashboard from './components/StudentDashboard';

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="/">LUCT Reporting</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/lecturer">Lecturer</Nav.Link>
              <Nav.Link as={Link} to="/prl">PRL</Nav.Link>
              <Nav.Link as={Link} to="/pl">PL</Nav.Link>
              <Nav.Link as={Link} to="/student">Student</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route path="/lecturer" element={<LecturerPage />} />        {/* ✅ FIXED */}
          <Route path="/prl" element={<PRLDashboard />} />             {/* ✅ Use full dashboard */}
          <Route path="/pl" element={<PLDashboard />} />               {/* ✅ Use full dashboard */}
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="*" element={<h3>Welcome to LUCT Reporting App</h3>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;