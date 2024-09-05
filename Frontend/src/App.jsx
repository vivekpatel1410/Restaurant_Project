import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './Pages/Home';
import Login from './components/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminLogin from './components/Admin/AdminLogin';
import UsersPage from './components/Admin/UsersPage';
import { useAuth } from './contexts/AuthContext';
import RestaurantTeam from './components/Admin/RestaurantTeam';
import RestourantMenu from './components/Admin/RestourantMenu';
import Dashboard from './components/Admin/Dashboard';


const App = () => {
    const { state } = useAuth();
    return (
        <Router>
            <Routes>
                {state.isAuthenticated ?
                    <>
                        <Route path="/maindashboard" element={<AdminDashboard />} />
                        <Route path="/users" element={<UsersPage />} />
                        <Route path='/team' element={<RestaurantTeam />} />
                        <Route path='/menu' element={<RestourantMenu />} />
                        <Route path="/admin" element={<AdminLogin />} />
                        <Route path='/dashboard' element={<Dashboard />} />
                    </> :
                    <>
                        <Route path="/login" element={<Login />} />

                    </>}
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Toaster /> {/* Toast notifications */}
        </Router>
    );
};

export default App;
