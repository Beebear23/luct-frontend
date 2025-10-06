// src/components/DashboardLayout.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const DashboardLayout = ({ children, role, title }) => {
  const location = useLocation();
  
  // Define sidebar items based on role
  const getSidebarItems = () => {
    const baseItems = [{ name: 'Dashboard', path: `/${role}` }];
    
    switch(role) {
      case 'student':
        return [...baseItems, 
          { name: 'Monitoring', path: `/${role}` },
          { name: 'Rating', path: `/${role}` }
        ];
      case 'lecturer':
        return [...baseItems,
          { name: 'Classes', path: `/${role}` },
          { name: 'Reports', path: `/${role}` },
          { name: 'Monitoring', path: `/${role}` },
          { name: 'Rating', path: `/${role}` }
        ];
      case 'prl':
        return [...baseItems,
          { name: 'Courses', path: `/${role}` },
          { name: 'Reports', path: `/${role}` },
          { name: 'Monitoring', path: `/${role}` },
          { name: 'Rating', path: `/${role}` },
          { name: 'Classes', path: `/${role}` }
        ];
      case 'pl':
        return [...baseItems,
          { name: 'Courses', path: `/${role}` },
          { name: 'Reports', path: `/${role}` },
          { name: 'Monitoring', path: `/${role}` },
          { name: 'Classes', path: `/${role}` },
          { name: 'Lectures', path: `/${role}` },
          { name: 'Rating', path: `/${role}` }
        ];
      default:
        return baseItems;
    }
  };

  const sidebarItems = getSidebarItems();

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h5>{role.toUpperCase()} DASHBOARD</h5>
        </div>
        <ul className="sidebar-nav">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <Link 
                to={item.path} 
                className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        <h2 className="page-title">{title || `${role.charAt(0).toUpperCase() + role.slice(1)} Dashboard`}</h2>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;