import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from './config'; 


import './Login.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employee'); // Default to 'employee'
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send login request to the server
            const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password, role });
            
            // Store token and user role in localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userRole', response.data.role);
            
            // Redirect based on the user role
            if (response.data.role === 'admin') {
                navigate('/home'); // Admin Home Page
            } else if (response.data.role === 'employee') {
                navigate('/employee-home'); // Employee Home Page
            }
        } catch (err) {
            // Handle login error
            alert('Invalid credentials');
        }
    };

    return (
        <div className="login-container">
            <h2>Login to Employee Management System</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <label>EMAIL ID</label>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>PASSWORD</label>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className="role-selector">
                    <label>
                        <input
                            type="radio"
                            value="admin"
                            checked={role === 'admin'}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        <h5>Admin</h5>
                    </label>
                    
                    <label>
                        <input
                            type="radio"
                            value="employee"
                            checked={role === 'employee'}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        <h5>Employee</h5>
                    </label>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;