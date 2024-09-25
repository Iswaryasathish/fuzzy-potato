import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage'; // Admin Home Page
import EmployeeHomePage from './components/EmployeeHomePage'; // Employee Home Page
import AddEmployee from './components/AddEmployee';
import ListEmployees from './components/ListEmployees';
import UpdateEmployee from './components/UpdateEmployee';
import DeleteEmployee from './components/DeleteEmployee';
import ListByJobRole from './components/ListByJobRole';
import CalendarComponent from './components/CalendarComponent'; // Ensure this path is correct
import EmployeeDetails from './components/EmployeeDetails';
import UpdateDetails from './components/UpdateDetails.js';


const App = () => {
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/home" element={<HomePage />} /> {/* Admin Home Page */}
                    <Route path="/employee-home" element={<EmployeeHomePage />} /> {/* Employee Home Page */}
                    <Route path="/add" element={<AddEmployee />} />
                    <Route path="/list" element={<ListEmployees />} />
                    <Route path="/update" element={<UpdateEmployee />} />
                    <Route path="/delete" element={<DeleteEmployee />} />
                    <Route path="/list-by-job-role" element={<ListByJobRole />} />
                    <Route path="/calendar-component" element={<CalendarComponent />} />
                    <Route path="/employee-details" element={<EmployeeDetails />} />
                    <Route path="/update-details" element={<UpdateDetails />} />
                    
                </Routes>
            </div>
        </Router>
    );
};

export default App;
