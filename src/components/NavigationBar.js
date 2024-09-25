// NavigationBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const NavigationBar = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole'); // Clear user role from storage
        window.location.href = '/';
    };

    const userRole = localStorage.getItem('userRole'); // Admin or Employee

    return (
        <div className="navbar">
            <img src="https://img.freepik.com/premium-vector/software-solution-logo-design-tech-company_924522-94.jpg" height="140px" width="200px" alt="Logo" />

            <ul>
                {userRole === 'employee' && (
                    <>
                        <li><Link to="/employee-home"> Home</Link></li>
                        <li><Link to ="/calendar-component">Calendar for Events</Link></li>
                        <li><Link to ="/employee-details">Employee Details</Link></li>
                        <li><Link to ="/update-details">Update Details</Link></li>

                        
                    </>
                )}
                {userRole === 'admin' && (
                    <>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/add">Register Employee</Link></li>
                        <li><Link to="/list">List of Employees</Link></li>
                        <li><Link to="/update">Update Details</Link></li>
                        <li><Link to="/delete">Delete Details</Link></li>
                        <li><Link to="/list-by-job-role">List by Job Role</Link></li>
                        <li><Link to ="/calendar-component">Go to Calendar</Link></li>
                        <li><Link to ="/employee-details">Employee Details</Link></li>
                        
                        
                        
                    </>
                )}
            </ul>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default NavigationBar;
