import React, { useEffect, useState } from 'react';
import './formstyle.css';
import PatientTable from '../PatientTable/patientTable';

const OrganMatching = () => {

  const [display,setdisplay]= useState(false);

  const [formData, setFormData] = useState({
    patientId: '',
    minAge: '',
    maxAge: '',
    minBMI: '',
    maxBMI: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    setdisplay(true);
  };

  useEffect(()=>{
     
  })

  return (
    <>
    <form className="patient-entry-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="patientId">Patient ID</label>
        <input type="text" id="patientId" name="patientId" onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="minAge">Min Age</label>
        <input type="text" id="minAge" name="minAge" onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="maxAge">Max Age</label>
        <input type="text" id="maxAge" name="maxAge" onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="minBMI">Min BMI</label>
        <input type="text" id="minBMI" name="minBMI" onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="maxBMI">Max BMI</label>
        <input type="text" id="maxBMI" name="maxBMI" onChange={handleInputChange} required />
      </div>
      <button type="submit" className="submit-button">Submit</button>
    </form>

     {
        (display)?
        <PatientTable/>
        :<div className="nomatch">
          <h1> Matching not found</h1>
        </div>
     }
    </>
  );
};

export default OrganMatching;
