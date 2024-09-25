import React, { useState } from 'react';
import axios from 'axios';
import NavigationBar from './NavigationBar';
import MessageBox from './MessageBox'; // Import the MessageBox component
import './View.css';
import API_BASE_URL from './config'; 


function EmployeeDetails() {
  const [employeeId, setEmployeeId] = useState('');
  const [employee, setEmployee] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // success, error, info

  const handleChange = (e) => {
    setEmployeeId(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!employeeId.trim()) {
      setMessage('Employee ID is required.');
      setMessageType('error');
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/api/employees/${employeeId}`);
      setEmployee(response.data);
      setMessage('');
      setMessageType('');
    } catch (err) {
      setMessage('Error fetching employee details.');
      setMessageType('error');
      setEmployee(null);
    }
  };

  const closeMessage = () => {
    setMessage('');
  };

  return (
    <div className='content9'>
      <NavigationBar />
      <div className='main'>
        <h2>View Employee Details</h2>
        <form onSubmit={handleSearch}>
          <div className='form-group'>
            <input
              type="text"
              placeholder="Enter Employee ID"
              value={employeeId}
              onChange={handleChange}
              required
            />
            <button type="submit">Search</button>
          </div>
        </form>
        {message && <MessageBox message={message} type={messageType} onClose={closeMessage} />}
        
        {employee && (
  <div className='employee-details'>
    <h3>Employee Details</h3>
    <table>
      <tbody>
        <tr>
          <td><strong>Employee ID:</strong></td>
          <td>{employee.employeeId}</td>
        </tr>
        <tr>
          <td><strong>Name:</strong></td>
          <td>{employee.name}</td>
        </tr>
        <tr>
          <td><strong>Age:</strong></td>
          <td>{employee.age}</td>
        </tr>
        <tr>
          <td><strong>Job Role:</strong></td>
          <td>{employee.jobRole}</td>
        </tr>
        <tr>
          <td><strong>Mobile No:</strong></td>
          <td>{employee.mobileNo}</td>
        </tr>
        <tr>
          <td><strong>Email:</strong></td>
          <td>{employee.email}</td>
        </tr>
        <tr>
          <td><strong>Address:</strong></td>
          <td>{employee.address}</td>
        </tr>
        <tr>
          <td><strong>Salary:</strong></td>
          <td>{employee.salary}</td>
        </tr>
        <tr>
          <td><strong>Joining Month:</strong></td>
          <td>{employee.joiningMonth}</td>
        </tr>
        <tr>
          <td><strong>Total PF:</strong></td>
          <td>{employee.totalPF}</td>
        </tr>
      </tbody>
    </table>
  </div>
)}

      </div>
    </div>
  );
}

export default EmployeeDetails;
