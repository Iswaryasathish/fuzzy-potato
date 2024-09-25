import React from 'react';
import NavigationBar from './NavigationBar';
import'./Home.css';

const HomePage = () => {
    return (
        <div className="content">
            <NavigationBar />
            <div className="main">
                <h2>Welcome to Employee Profile Management System</h2>
                
            </div>
        </div>
    );
};

export default HomePage;

