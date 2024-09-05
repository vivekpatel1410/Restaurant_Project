import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminDashboard from './AdminDashboard';
import { FaUser, FaCog, FaFileAlt, FaUsers, FaUtensils, FaListUl, FaSignOutAlt } from 'react-icons/fa';


const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [teamCount, setTeamCount] = useState(0);
  const [menuCount, setMenuCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get('http://localhost:1111/api/v1/counts');
        setUserCount(response.data.userCount);
        setTeamCount(response.data.teamCount);
        setMenuCount(response.data.menuCount);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };
    

    fetchCounts();
  }, []);

  return (
    <AdminDashboard>
      <div className="dashboard-container">
        <div className="dashboard">
          <div className="dashboard-item">
            <h2><FaUsers /> All Users:</h2>
            <p>{userCount}</p>
          </div>
          <div className="dashboard-item">
            <h2><FaUser /> All Team Members:</h2>
            <p>{teamCount}</p>
          </div>
          <div className="dashboard-item">
            <h2><FaUtensils /> All Menu Items:</h2>
            <p>{menuCount}</p>
          </div>
        </div>
        <div className="dashboard-image">
          <img src='public/login_background.jpg' alt='Dashboard Background' />
        </div>
      </div>
    </AdminDashboard>
  );
};

export default Dashboard;
