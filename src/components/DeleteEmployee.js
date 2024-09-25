import React, { useState } from 'react';
import axios from 'axios';
import NavigationBar from './NavigationBar';
import MessageBox from './MessageBox'; // Import the MessageBox component
import API_BASE_URL from './config'; 



function DeleteEmployee() {
  const [employeeId, setEmployeeId] = useState('');
  const [employee, setEmployee] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // success, error

  const fetchEmployee = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/employees/${employeeId}`);
      setEmployee(res.data);
      setMessage('Employee fetched successfully!');
      setMessageType('success');
    } catch (err) {
      console.error(err);
      setMessage('Error fetching employee');
      setMessageType('error');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/api/employees/${employeeId}`);
      setMessage('Employee deleted successfully!');
      setMessageType('success');
      setEmployee(null);
    } catch (err) {
      console.error(err);
      setMessage('Error deleting employee');
      setMessageType('error');
    }
  };

  const closeMessage = () => {
    setMessage('');
  };

  return (
    <div className='container'>
      <NavigationBar />
      <div className='main'>
        <h2>Delete Employee</h2>
        <input 
          type="text" 
          placeholder="Enter Employee ID" 
          value={employeeId} 
          onChange={(e) => setEmployeeId(e.target.value)} 
        />
        <button onClick={fetchEmployee}>Search</button>

        {employee && (
          <div className='employee-details'>
            <p><strong>Employee ID:</strong> {employee.employeeId}</p>
            <p><strong>Name:</strong> {employee.name}</p>
            <p><strong>Age:</strong> {employee.age}</p>
            <p><strong>Job Role:</strong> {employee.jobRole}</p>
            <p><strong>Mobile No:</strong> {employee.mobileNo}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Address:</strong> {employee.address}</p>
            <button onClick={handleDelete} className='delete-button'>Delete</button>
          </div>
        )}
        <MessageBox message={message} type={messageType} onClose={closeMessage} />
      </div>
    </div>
  );
}

export default DeleteEmployee;
