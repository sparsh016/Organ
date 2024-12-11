import React from 'react';
import './style.css';

const doctors = [
    {
        id: 1,
        name: 'Dr. John Smith',
        specialization: 'Cardiologist',
        phone: '555-123-4567'
      },
      {
        id: 2,
        name: 'Dr. Emily Johnson',
        specialization: 'Pediatrician',
        phone: '555-987-6543'
      },
      {
        id: 3,
        name: 'Dr. Michael Brown',
        specialization: 'Dermatologist',
        phone: '555-234-5678'
      },
      {
        id: 4,
        name: 'Dr. Sarah Davis',
        specialization: 'Orthopedic Surgeon',
        phone: '555-876-5432'
      },
      {
        id: 5,
        name: 'Dr. Jessica Wilson',
        specialization: 'Oncologist',
        phone: '555-345-6789'
      },
      {
        id: 6,
        name: 'Dr. Brian Garcia',
        specialization: 'Neurologist',
        phone: '555-765-4321'
      },
      {
        id: 7,
        name: 'Dr. Samantha Martinez',
        specialization: 'Psychiatrist',
        phone: '555-456-7890'
      },
      {
        id: 8,
        name: 'Dr. Christopher Robinson',
        specialization: 'Gastroenterologist',
        phone: '555-654-3210'
      },
      {
        id: 9,
        name: 'Dr. Amanda Clark',
        specialization: 'Endocrinologist',
        phone: '555-567-8901'
      },
      {
        id: 10,
        name: 'Dr. Matthew Lewis',
        specialization: 'Radiologist',
        phone: '555-789-0123'
      }
  // Add more doctor objects as needed
];

const DoctorCard = ({ doctor }) => (
    <div className="flex-grow max-w-sm rounded overflow-hidden shadow-lg m-2 bg-white">
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2 text-blue-600">{doctor.name}</div>
      <p className="cardtext ">ID: {doctor.id}</p>
      <p className="spz text-base">Specialization: {doctor.specialization}</p>
      <p className="spz text-base">Phone: {doctor.phone}</p>
    </div>
  </div>
);

const ViewDoctors = () => (
    
    <div className='viewdoc'>
      <h1 className="headingDoc">Doctors and Surgeons</h1>
    <div className="flex flex-wrap justify-center mt-10">
      {doctors.map(doctor => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
    </div>
  
);

export default ViewDoctors;
