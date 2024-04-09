// WelcomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './welcome.css';

const Welcome = () => {
  return (
    <div className="welcome-container">
      <h1>Welcome to EasyClass</h1>
      <p>This system helps you manage your students efficiently.</p>
      <Link to="/Home" className="button">
        Go to Student Management
      </Link>
    </div>
  );
}

export default Welcome;
