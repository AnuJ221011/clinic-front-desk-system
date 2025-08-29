import React from "react";

const Header = ({ user, onLogout }) => {
  return (
    <header className="bg-gray-900 shadow-md p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Left side: App name + Welcome message */}
        <div>
          <h1 className="text-2xl font-bold text-white">
            Clinic Front Desk System
          </h1>
          <p className="text-gray-400">Welcome, {user?.name}</p>
        </div>

        {/* Right side: Logout button */}
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg shadow hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
