import React from 'react';

const Header = ({ user, onLogout }) => {
  return (
    <div className="header">
      <div className="flex flex-between flex-align-center">
        <div>
          <h1>Clinic Front Desk System</h1>
          <p>Welcome, {user.name}</p>
        </div>
        <button className="btn btn-danger" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;