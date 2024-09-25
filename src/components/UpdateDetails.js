import React, { useState } from 'react';
import axios from 'axios';
import NavigationBar from './NavigationBar';
import MessageBox from './MessageBox'; 
import './Update.css';
import API_BASE_URL from './config'; 


function UpdateDetails() {
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

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/api/employees/${employeeId}`, employee);
      setMessage('Employee updated successfully!');
      setMessageType('success');
    } catch (err) {
      console.error(err);
      setMessage('Error updating employee');
      setMessageType('error');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/api/employees/${employeeId}`);
      setEmployee(null);
      setMessage('Employee deleted successfully!');
      setMessageType('success');
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
    <div className='contain'>
      <NavigationBar />
      <div className='main'>
        <h2>Update Employee Details</h2>
        <input 
          type="text" 
          placeholder="Enter Employee ID" 
          value={employeeId} 
          onChange={(e) => setEmployeeId(e.target.value)} 
        />
        <button onClick={fetchEmployee}>Search</button>

        {employee && (
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="name" 
              placeholder="Name" 
              value={employee.name || ''} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="number" 
              name="age" 
              placeholder="Age" 
              value={employee.age || ''} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="text" 
              name="mobileNo" 
              placeholder="Mobile No" 
              value={employee.mobileNo || ''} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              value={employee.email || ''} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="text" 
              name="address" 
              placeholder="Address" 
              value={employee.address || ''} 
              onChange={handleChange} 
              required 
            />
            <button type="submit">Update</button>
            <button type="button" onClick={handleDelete}>Delete</button>
          </form>
        )}
        <MessageBox message={message} type={messageType} onClose={closeMessage} />
      </div>
    </div>
  );
}

export default UpdateDetails;

