import React from 'react';
import { ToastContainer } from 'react-toastify';
import Nav from './Nav';

function Home() {
  return (
    <div className="min-h-screen dark:text-white bg-gray-100 dark:bg-gray-900 flex flex-col">
      {/* Navbar */}
      <Nav />

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-4xl font-bold text-center">
          Welcome to the Admin Panel
        </h1>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

export default Home;
