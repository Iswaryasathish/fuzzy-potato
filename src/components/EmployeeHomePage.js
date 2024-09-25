// EmployeeHomePage.js
import React from 'react';
import NavigationBar from './NavigationBar';
import './Home.css';

const EmployeeHomePage = () => {
    return (
        <div className="page">
            <NavigationBar />
            <div className="main">
                <h2>Welcome to Employee Dashboard</h2>
                
            </div>
        </div>
    );
};

export default EmployeeHomePage;
