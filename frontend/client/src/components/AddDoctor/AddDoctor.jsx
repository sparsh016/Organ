import React, { useState } from 'react';
import './styles.css';
import { Toaster ,toast } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    specialization: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddDoctor = (e) => {
    e.preventDefault();
    // Add your logic to add the doctor
    console.log('Adding doctor:', formData);
    // Reset the form fields
    setFormData({
      id: '',
      name: '',
      specialization: '',
      phone: ''
    });

    toast.success('Doctor added successfully', {
      autoClose: 2000 // Close the toast after 2 seconds
    });

  };

  return (
    <form className="add-doctor-form" onSubmit={handleAddDoctor}>
      <Toaster/>
      <div className="doctor-app">
        <div className="form-container">
          <div className="form-group">
            <label htmlFor="id">Doctor ID</label>
            <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} placeholder="Doctor ID" required/>
          </div>
          <div className="form-group">
            <label htmlFor="name">Doctor Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required/>
          </div>
          <div className="form-group">
            <label htmlFor="specialization">Specialization</label>
            <input type="text" id="specialization" name="specialization" value={formData.specialization} onChange={handleChange} placeholder="Specialization" required/>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone No." required/>
          </div>
          <button type="submit">Add Doctor</button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
