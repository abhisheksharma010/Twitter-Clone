import React from 'react';
import '../stlyes/LayoutPage.css';
import Navbar from './Navabar'; // Import your CSS file
import Trending from './Trending';

const LayoutPage = ({ children }) => {
  return (
    <div className="layout-page">
      <div className="left-section"> <Navbar/></div>
      <div className="middle-section">
        {children}
      </div>
      <div className="right-section"><Trending/></div>
    </div>
  );
};

export default LayoutPage;
