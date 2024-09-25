import React, { useState } from 'react';
import axios from 'axios';
import NavigationBar from './NavigationBar';
import MessageBox from './MessageBox';
import './Update.css';
import API_BASE_URL from './config'; 


function UpdateEmployee() {
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

  const calculateTotalPF = () => {
    const pfRate = 0.12; // Assuming PF rate is 12% of salary
    const monthsWorked = new Date().getMonth() + 1 - new Date(employee.joiningMonth).getMonth();
    const totalPFAmount = monthsWorked > 0 ? (employee.salary * pfRate) * monthsWorked : 0;
    return totalPFAmount;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEmployee = { ...employee, totalPF: calculateTotalPF() };

    try {
      await axios.put(`${API_BASE_URL}/api/employees/${employeeId}`, updatedEmployee);
      setMessage('Employee updated successfully!');
      setMessageType('success');
    } catch (err) {
      console.error(err);
      setMessage('Error updating employee');
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
              name="photo"
              placeholder="Photo URL"
              value={employee.photo || ''}
              onChange={handleChange}
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={employee.name || ''}
              onChange={handleChange}
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={employee.age || ''}
              onChange={handleChange}
            />
            <input
              type="text"
              name="jobRole"
              placeholder="Job Role"
              value={employee.jobRole || ''}
              onChange={handleChange}
            />
            <input
              type="text"
              name="mobileNo"
              placeholder="Mobile No"
              value={employee.mobileNo || ''}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={employee.email || ''}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={employee.address || ''}
              onChange={handleChange}
            />
            <input
              type="number"
              name="salary"
              placeholder="Salary"
              value={employee.salary || ''}
              onChange={handleChange}
            />
            <input
              type="month"
              name="joiningMonth"
              value={employee.joiningMonth || ''}
              onChange={handleChange}
            />
            <button type="submit">Update</button>
          </form>
        )}
        <MessageBox message={message} type={messageType} onClose={closeMessage} />
      </div>
    </div>
  );
}

export default UpdateEmployee;

