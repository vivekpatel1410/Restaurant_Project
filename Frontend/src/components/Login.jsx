import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === 'user@gmail.com' && password === '123') {
            toast.success('Login successfull!');
            login(); 
            navigate('/');
        } else {
            toast.error('Invalid email or password');
        }
    };

    return (
        <div className="login-container">
             <div className="scroll-container">
                <h1 className="scroll-text">ZEESH Restaurant</h1>
            </div>
            <center><h2>Login</h2></center>
            <form onSubmit={handleSubmit}>
                <div>
                    
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;