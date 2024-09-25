import React, { useState } from 'react';
import axios from 'axios';
import NavigationBar from './NavigationBar';
import API_BASE_URL from './config'; 


function ListByJobRole() {
  const [role, setRole] = useState('');
  const [employees, setEmployees] = useState([]);

  const fetchEmployeesByRole = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/employees/role/${role}`);
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching employees');
    }
  };

  return (
    <div className='content5'>
      <NavigationBar/>
      <div className='main'>
      <h2>List Employees by Job Role</h2>
      <select onChange={(e) => setRole(e.target.value)} value={role}>
        <option value="">Select Job Role</option>
        <option value="Front-end Developer">Front-end Developer</option>
        <option value="Backend Developer">Backend Developer</option>
        <option value="Designer">Designer</option>
        <option value="Tester">Tester</option>
        <option value="Developer">Developer</option>
      </select>
      <button onClick={fetchEmployeesByRole}>Search</button>

      {employees.length > 0 && (
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
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.employeeId}>
                <td><img src={emp.photo} alt="Employee" style={{ height: '2rem', width: '2rem' }} /></td>
                <td>{emp.employeeId}</td>
                <td>{emp.name}</td>
                <td>{emp.age}</td>
                <td>{emp.jobRole}</td>
                <td>{emp.mobileNo}</td>
                <td>{emp.email}</td>
                <td>{emp.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
}

export default ListByJobRole;
