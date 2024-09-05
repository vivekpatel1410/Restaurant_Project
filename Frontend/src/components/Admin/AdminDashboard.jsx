import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCog, FaFileAlt, FaUsers, FaUtensils, FaListUl, FaSignOutAlt } from 'react-icons/fa';
import { BiSolidDashboard } from "react-icons/bi";

const AdminDashboard = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] =  React.useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="admin-dashboard-container">
            <header className="admin-dashboard-header">
                <button className="menu-toggle" onClick={toggleSidebar}>
                    ☰
                </button>
                <h1>Admin Dashboard</h1>
            </header>
            <aside className={`admin-dashboard-sidebar ${sidebarOpen ? 'hide' : ''}`}>
                <img src="/public/pngtree-chef-restaurant-logo-png-image_6136204.png" alt="Logo" className="admin-dashboard-logo" />
                <nav className="admin-dashboard-nav">
                <Link to="/dashboard" className="admin-dashboard-nav-link">
                        <BiSolidDashboard  className="admin-dashboard-icon" /> Dashboard
                    </Link>
                    <Link to="/users" className="admin-dashboard-nav-link">
                        <FaUsers className="admin-dashboard-icon" /> Manage Users
                    </Link>
                    <Link to="/team" className="admin-dashboard-nav-link">
                        <FaUser className="admin-dashboard-icon" /> Restaurant Team
                    </Link>
                    {/* <Link to="/services" className="admin-dashboard-nav-link">
                        <FaUtensils className="admin-dashboard-icon" /> Restaurant Services
                    </Link> */}
                    <Link to="/menu" className="admin-dashboard-nav-link">
                    <FaUtensils className="admin-dashboard-icon" /> Restaurant Menu 
                    </Link>
                    <Link to="/admin" className="admin-dashboard-nav-link-logout">
                        <FaSignOutAlt className="admin-dashboard-icon" /> Logout
                    </Link>
                </nav>
            </aside>
            <main className="admin-dashboard-content">
            {children}
            </main>
        </div>
    );
};

export default AdminDashboard;
