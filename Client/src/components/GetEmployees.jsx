import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import { toast ,ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const navigate = useNavigate()
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5); // Pagination limit
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // Sorting order
  const [activeOnly, setActiveOnly] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const getAllEmployees = async () => {
    try {
      const response = await fetch('http://localhost:4000/create/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  // Search filtering
  const filteredEmployees = employees
    .filter((employee) =>
      employee.f_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.f_Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.f_Id.toString().includes(searchTerm)
    )
    .filter(employee => !activeOnly || employee.f_Status === 'Active'); // Active filter

  // Sorting functionality
  const sortedEmployees = filteredEmployees.sort((a, b) => {
    if (sortField) {
      const valA = a[sortField] instanceof Date ? new Date(a[sortField]) : a[sortField].toString().toLowerCase();
      const valB = b[sortField] instanceof Date ? new Date(b[sortField]) : b[sortField].toString().toLowerCase();
      if (sortOrder === 'asc') return valA > valB ? 1 : -1;
      return valA < valB ? 1 : -1;
    }
    return 0;
  });

  // Pagination functionality
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Edit/Delete placeholders
  const handleEdit = (id) => {
    console.log(`Edit employee with ID: ${id}`);
    navigate(`/editemployee/${id}`); // Navigate to the edit page with the employee ID
  };
  



 
  
  const handleDelete = async (id) => {
    console.log(id)
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:4000/create/employee/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        const result = await response.json();
  
        if (response.ok && result.success) {
          // If the deletion is successful, filter out the deleted employee from the state
          setEmployees((prevEmployees) =>
            prevEmployees.filter((employee) => employee.f_Id !== id)
          );
          toast.success(result.message)
           // Success message from the backend
        } else {
          toast.error(result.message || 'Error deleting employee.')
          alert(result.message || 'Error deleting employee.');
        }
      } catch (error) {
        console.error("Error:", error);
        alert('Error deleting employee.');
      }
    }
  };
  
  

  return (
    <div className='min-h-screen dark:text-white bg-gray-100 dark:bg-gray-900'>
      <Nav />
      
      {/* Search and Filter Section */}
      <div style={{ backgroundColor: 'lightblue', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search by name, email, or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '5px', borderRadius: '4px', border: '1px solid gray' }}
        />
        <label style={{ marginLeft: '10px' }}>
          <input
            type="checkbox"
            checked={activeOnly}
            onChange={() => setActiveOnly(!activeOnly)}
            style={{ marginRight: '5px' }}
          />
          Active Only
        </label>
        <span>Total Count: {filteredEmployees.length}</span>
      </div>
      
      {/* Employee Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }} className='mx-5'>
        <thead>
          <tr style={{ backgroundColor: 'lightblue', textAlign: 'left', borderBottom: '2px solid gray' }}>
            <th onClick={() => {setSortField('f_Id'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}}>Unique Id</th>
            <th>Image</th>
            <th onClick={() => {setSortField('f_Name'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}}>Name</th>
            <th onClick={() => {setSortField('f_Email'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}}>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th onClick={() => {setSortField('f_Createdate'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}}>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            console.log(employee.f_Image),
            <tr key={employee._id} style={{ borderBottom: '1px solid gray' }}>
              <td>{employee.f_Id}</td>
              <td>
                <img src={employee.f_Image} alt={employee.f_Image} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
              </td>
              <td>{employee.f_Name}</td>
              <td><a href={`mailto:${employee.f_Email}`} style={{ color: 'blue', textDecoration: 'underline' }}>{employee.f_Email}</a></td>
              <td>{employee.f_Mobile}</td>
              <td>{employee.f_Designation}</td>
              <td>{employee.f_gender}</td>
              <td>{employee.f_Course}</td>
              <td>{new Date(employee.f_Createdate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEdit(employee.f_Id)} style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', borderRadius: '4px', border: 'none' }}>Edit</button>
                <button onClick={() => handleDelete(employee.f_Id)} style={{ padding: '5px 10px', backgroundColor: '#F44336', color: 'white', borderRadius: '4px', border: 'none' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
        {Array.from({ length: Math.ceil(filteredEmployees.length / employeesPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            style={{
              margin: '0 5px',
              padding: '5px 10px',
              backgroundColor: currentPage === i + 1 ? '#4CAF50' : '#f0f0f0',
              color: currentPage === i + 1 ? 'white' : 'black',
              borderRadius: '4px',
              border: currentPage === i + 1 ? 'none' : '1px solid gray'
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default EmployeeList;
