import React, { useMemo } from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import './styles.css';

// Mock data
const data = [
  { id: 1, name: 'Alice', organType: 'Heart', hospitalId: 'New York' },
  { id: 2, name: 'Bob', organType: 'Kidney', hospitalId: 'San Francisco' },
  { id: 3, name: 'Charlie', organType: 'Lungs', hospitalId: 'Los Angeles' },
  // Add more data as needed
];


// Table columns
const columns = [
  { Header: 'Patient-Id', accessor: 'id' },
  { Header: 'Name', accessor: 'name' },
  { Header: 'Organ-Type', accessor: 'organType' },
  { Header: 'Hospital-Id', accessor: 'hospitalId' },
  // Add more columns as needed
];

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    state: { pageIndex, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 ,pageSize: 8},
    },
    useGlobalFilter,
    usePagination
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={globalFilter || ''}
        onChange={e => setGlobalFilter(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px' }}
      />
      <table {...getTableProps()} style={{ border: '1px solid black', width: '100%', marginTop: '20px' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} style={{ borderBottom: '1px solid black', background: 'aliceblue', padding: '8px' }}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()} style={{ borderBottom: '1px solid black', padding: '8px' , fontFamily:'sans-serif', fontWeight: '300'}}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ marginTop: '10px' }}>
        <button className="button" onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <button className="button" onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

function Tablecp() {
  const tableData = useMemo(() => data, []);

  return (
    <div  className="mt-10">
      <h1 className='headingT font-bold'>All Patients list</h1>
      <Table columns={columns} data={tableData} />
    </div>
  );
}

export default Tablecp;
