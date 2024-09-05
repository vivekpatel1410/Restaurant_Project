import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../../App.css';

const AdminLogin = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        if (!username || !password) {
            toast.error('Please enter both username and password.');
            setLoading(false);
            return;
        }

        try {

            await authenticateUser(username, password);
            login(true);
            navigate('/maindashboard');
        } catch (err) {
            toast.error('Failed to log in. Please check your credentials and try again.');
        } finally {
            setLoading(false);
        }
    };

    const authenticateUser = async (username, password) => {
        if (username === 'admin@gmail.com' && password === '123') {
            toast.success('Login successfull!');
            return new Promise((resolve) => setTimeout(resolve, 500));
        } else {
            throw new Error('Invalid credentials');
        }
    };

    return (


        <div className="admin-login-container">
            <div className="scroll-container">
                <h1 className="scroll-text">ZEESH Restaurant</h1>
            </div>
            <h1 className="admin-login-title">Admin Login</h1>
            <p className="admin-login-description">Please enter your credentials to access the admin dashboard.</p>
            {error && <p className="admin-login-error">{error}</p>}
            <form onSubmit={handleSubmit} className="admin-login-form">
                <div className="admin-login-form-group">
                    <label htmlFor="username" className="admin-login-label">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        required
                        className="admin-login-input"
                    />
                </div>
                <div className="admin-login-form-group">
                    <label htmlFor="password" className="admin-login-label">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                        className="admin-login-input"
                    />
                </div>
                <button
                    type="submit"
                    className="admin-login-button"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login as Admin'}
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
