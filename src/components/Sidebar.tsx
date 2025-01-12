import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import sidebarData from '../sidebarData';
import logo from "../assets/logo.svg";

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg border-r">
      <Link to="/">
        <div className="p-4 border-b">
          <img src={logo} alt="Logo" className="h-16" />
        </div>
      </Link>

      <nav className="py-4">
        <ul className="space-y-1">
          {sidebarData.map((item) => {
            const isActive = location.pathname === item.slug;
            return (
              <li key={item.slug}>
                <Link
                  to={item.slug}
                  className={`flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 transition-colors duration-200
                    ${isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-500' : ''}`}
                >
                  <span className="text-lg">
                    <item.icon />
                  </span>
                  <span className="ml-3 text-base leading-5 font-medium ">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;