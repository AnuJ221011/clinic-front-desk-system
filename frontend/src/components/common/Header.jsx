import React from "react";

const Header = ({ user, onLogout }) => {
  return (
    <header className="bg-gray-900 shadow-md p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center max-w-6xl mx-auto gap-2 sm:gap-0">
        {/* Left side: App name + Welcome message */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Clinic Front Desk System
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Welcome, {user?.name}
          </p>
        </div>

        {/* Right side: Logout button */}
        <button
          onClick={onLogout}
          className="mt-2 sm:mt-0 px-4 py-2 bg-red-600 text-white font-medium rounded-lg shadow hover:bg-red-700 transition text-sm sm:text-base"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
