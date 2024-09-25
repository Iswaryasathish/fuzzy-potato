import React, { useState } from 'react';
import axios from 'axios';
import NavigationBar from './NavigationBar';
import MessageBox from './MessageBox'; // Import the MessageBox component
import API_BASE_URL from './config'; 
import './Add.css';


function AddEmployee() {
  const [employee, setEmployee] = useState({
    photo: null,
    employeeId: '',
    name: '',
    age: '',
    jobRole: '',
    mobileNo: '',
    email: '',
    address: '',
    salary: '',
    joiningMonth: '',
  });

  const [totalPF, setTotalPF] = useState(0);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // success, error, info

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setEmployee({ ...employee, photo: files[0] });
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  const calculateTotalPF = () => {
    const pfRate = 0.12; // Assuming PF rate is 12% of salary
    const monthsWorked = new Date().getMonth() + 1 - new Date(employee.joiningMonth).getMonth();
    const totalPFAmount = monthsWorked > 0 ? (employee.salary * pfRate) * monthsWorked : 0;
    setTotalPF(totalPFAmount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employee.employeeId.trim()) {
      setMessage('Employee ID is required and cannot be empty.');
      setMessageType('error');
      return;
    }

    calculateTotalPF(); // Calculate total PF before submitting

    const formData = new FormData();
    formData.append('photo', employee.photo);
    formData.append('employeeId', employee.employeeId);
    formData.append('name', employee.name);
    formData.append('age', employee.age);
    formData.append('jobRole', employee.jobRole);
    formData.append('mobileNo', employee.mobileNo);
    formData.append('email', employee.email);
    formData.append('address', employee.address);
    formData.append('salary', employee.salary);
    formData.append('joiningMonth', employee.joiningMonth);
    formData.append('totalPF', totalPF); // Include total PF in the formData

    try {
      const response = await axios.post(`${API_BASE_URL}/api/employees/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setMessage('Employee added successfully!');
      setMessageType('success');
    } catch (err) {
      setMessage('Error adding employee');
      setMessageType('error');
    }
  };

  const closeMessage = () => {
    setMessage('');
  };

  return (
    <div className='content1'>
      <NavigationBar />
      <div className='main1'>
        <h2>Add New Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <div className='label-container'>
              <label>Employee Photo</label>
            </div>
            <input 
              type="file" 
              name="photo" 
              accept="image/*" 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className='form-group'>
            <div className='label-container'>
              <label>Employee Id</label>
            </div>
            <input 
              type="text" 
              name="employeeId" 
              placeholder="Employee ID" 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className='form-group'>
            <div className='label-container'>
              <label>Employee Name</label>
            </div>
            <input 
              type="text" 
              name="name" 
              placeholder="Name" 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className='form-group'>
            <div className='label-container'>
              <label>Employee Age</label>
            </div>
            <input 
              type="number" 
              name="age" 
              placeholder="Age" 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className='form-group'>
            <div className='label-container'>
              <label>Employee Job Role</label>
            </div>
            <input 
              type="text" 
              name="jobRole" 
              placeholder="Job Role" 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className='form-group'>
            <div className='label-container'>
              <label>Employee Mobile No</label>
            </div>
            <input 
              type="text" 
              name="mobileNo" 
              placeholder="Mobile No" 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className='form-group'>
            <div className='label-container'>
              <label>Employee Email Id</label>
            </div>
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className='form-group'>
            <div className='label-container'>
              <label>Employee Address</label>
            </div>
            <input 
              type="text" 
              name="address" 
              placeholder="Address" 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className='form-group'>
            <div className='label-container'>
              <label>Employee Salary</label>
            </div>
            <input 
              type="number" 
              name="salary" 
              placeholder="Salary" 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className='form-group'>
            <div className='label-container'>
              <label>Joining Month</label>
            </div>
            <input 
              type="month" 
              name="joiningMonth" 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit">Register</button>
        </form>
        <MessageBox message={message} type={messageType} onClose={closeMessage} />
      </div>
    </div>
  );
}

export default AddEmployee;
