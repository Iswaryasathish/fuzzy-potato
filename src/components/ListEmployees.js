import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationBar from './NavigationBar';
import './List.css';
import API_BASE_URL from './config'; 


function ListEmployees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/employees`);
        setEmployees(res.data);
      } catch (err) {
        console.error('Error fetching employees:', err.response ? err.response.data : err.message);
        alert('Error fetching employees. Please check the console for more details.');
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className='content2'>
      <NavigationBar />
      <div className='main2'>
        <h2>List of Employees</h2>
        {employees.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Job Role</th>
                <th>Mobile No</th>
                <th>Email</th>
                <th>Address</th>
                <th>Salary</th>
                <th>Joining Month</th>
                <th>Total PF</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.employeeId}>
                  <td data-label="Photo">
                    <img src={emp.photo} alt={emp.name} style={{ height: '2rem', width: '2rem' }} />
                  </td>
                  <td data-label="Employee ID">{emp.employeeId}</td>
                  <td data-label="Name">{emp.name}</td>
                  <td data-label="Age">{emp.age}</td>
                  <td data-label="Job Role">{emp.jobRole}</td>
                  <td data-label="Mobile No">{emp.mobileNo}</td>
                  <td data-label="Email">{emp.email}</td>
                  <td data-label="Address">{emp.address}</td>
                  <td data-label="Salary">{emp.salary}</td>
                  <td data-label="Joining Month">{new Date(emp.joiningMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}</td>
                  <td data-label="Total PF">{emp.totalPF}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No employees found.</p>
        )}
      </div>
    </div>
  );
}

export default ListEmployees;
