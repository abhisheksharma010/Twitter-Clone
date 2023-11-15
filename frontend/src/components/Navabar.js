import React from 'react';
import '../stlyes/navbar.css'; // Make sure to use the correct path to your CSS file

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="https://media.istockphoto.com/id/1313644269/vector/gold-and-silver-circle-star-logo-template.jpg?s=612x612&w=0&k=20&c=hDqCI9qTkNqNcKa6XS7aBim7xKz8cZbnm80Z_xiU2DI=" alt="Logo" />
      </div>
      <div className="nav-item active">
        <i className="fas fa-home"></i>Home
      </div>
      <div className="nav-item">
        <i className="fas fa-search"></i>Explore
      </div>
      <div className="nav-item">
        <i className="fas fa-envelope"></i>Messages
      </div>
      <div className="nav-item">
        <i className="fas fa-user"></i>Profile
      </div>
      <div className="nav-item post-btn">
        <i className="fas fa-plus"></i>Post
      </div>
    </div>
  );
};

export default Navbar;
