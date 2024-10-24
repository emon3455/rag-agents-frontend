import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black fixed top-0 w-full z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-white text-2xl font-bold"><span className="text-orange-500">ODL</span>-AI</h1>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-500 transition-all duration-400">Home</Link>
              <Link to="/agent" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-500 transition-all duration-400">Agent</Link>
              <Link to="/login" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-500 transition-all duration-400">Login</Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/home" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Home</Link>
            <Link to="/agent" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Agent</Link>
            <Link to="/services" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Services</Link>
            <Link to="/login" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
