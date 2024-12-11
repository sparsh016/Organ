import React, { useState } from 'react';
import './PatientTable.css';

const data = [
  { type: 'Type 1', id: '1', name: 'John Doe', age: '30', bloodType: 'A+', organType: 'Heart', bmi: '25.5', hospitalId: '123' },
  { type: 'Type 2', id: '2', name: 'Jane Smith', age: '25', bloodType: 'B-', organType: 'Kidney', bmi: '22.0', hospitalId: '456' },
  { type: 'Type 1', id: '1', name: 'John Doe', age: '30', bloodType: 'A+', organType: 'Heart', bmi: '25.5', hospitalId: '123' },
  { type: 'Type 2', id: '2', name: 'Jane Smith', age: '25', bloodType: 'B-', organType: 'Kidney', bmi: '22.0', hospitalId: '456' },
  { type: 'Type 1', id: '1', name: 'John Doe', age: '30', bloodType: 'A+', organType: 'Heart', bmi: '25.5', hospitalId: '123' },
  { type: 'Type 2', id: '2', name: 'Jane Smith', age: '25', bloodType: 'B-', organType: 'Kidney', bmi: '22.0', hospitalId: '456' },
  { type: 'Type 1', id: '1', name: 'John Doe', age: '30', bloodType: 'A+', organType: 'Heart', bmi: '25.5', hospitalId: '123' },
  { type: 'Type 2', id: '2', name: 'Jane Smith', age: '25', bloodType: 'B-', organType: 'Kidney', bmi: '22.0', hospitalId: '456' },
  { type: 'Type 1', id: '1', name: 'John Doe', age: '30', bloodType: 'A+', organType: 'Heart', bmi: '25.5', hospitalId: '123' },
  { type: 'Type 2', id: '2', name: 'Jane Smith', age: '25', bloodType: 'B-', organType: 'Kidney', bmi: '22.0', hospitalId: '456' },
  { type: 'Type 1', id: '1', name: 'John Doe', age: '30', bloodType: 'A+', organType: 'Heart', bmi: '25.5', hospitalId: '123' },
  { type: 'Type 2', id: '2', name: 'Jane Smith', age: '25', bloodType: 'B-', organType: 'Kidney', bmi: '22.0', hospitalId: '456' },
  // Add more data as needed
];

const columns = [
  { label: 'Type', width: '10%' },
  { label: 'ID', width: '10%' },
  { label: 'Name', width: '15%' },
  { label: 'Age', width: '10%' },
  { label: 'Blood Type', width: '15%' },
  { label: 'Organ Type', width: '15%', className: 'organ-column' },
  { label: 'BMI', width: '10%' },
  { label: 'Hospital ID', width: '15%' },
];

const itemsPerPage = 8;

const PatientTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleData = data.slice(startIndex, endIndex);

  return (
    <>
    <h1 className="headingPT">Matching Patients</h1>
    <div className="table-container">
      <table className="patient-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} style={{ width: column.width }} className={column.className}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleData.map((row, rowIndex) => (
             <tr key={rowIndex}>
             {columns.map((column, colIndex) => {
               if (column.label === 'Organ Type') {
                 const colorIndex = rowIndex % 4 + 1; // Calculate color index based on row index
                 return (
                   <td key={colIndex} style={{ width: column.width }} className={`${column.className} organ-color-${colorIndex}`}>{row[Object.keys(row)[colIndex]]}</td>
                 );
               } else {
                 return (
                   <td key={colIndex} style={{ width: column.width }}>{row[Object.keys(row)[colIndex]]}</td>
                 );
               }
             })}
           </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button className="btn prev-btn" onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
        <span>{`Page ${currentPage}`}</span>
        <button className="btn next-btn" onClick={handleNextPage} disabled={endIndex >= data.length}>Next</button>
      </div>
    </div>
    </>
  );
};

export default PatientTable;
