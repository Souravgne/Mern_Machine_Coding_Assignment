import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5); // Pagination limit
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // Sorting order
  const [activeOnly, setActiveOnly] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Fetch all employees
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

  // Search and filter functionality
  const filteredEmployees = employees
    .filter((employee) =>
      employee.f_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.f_Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.f_Id.toString().includes(searchTerm)
    )
    .filter((employee) => !activeOnly || employee.f_Status === 'Active');

  // Sorting functionality
  const sortedEmployees = filteredEmployees.sort((a, b) => {
    if (sortField) {
      const valA = a[sortField] instanceof Date ? new Date(a[sortField]) : a[sortField].toString().toLowerCase();
      const valB = b[sortField] instanceof Date ? new Date(b[sortField]) : b[sortField].toString().toLowerCase();
      return sortOrder === 'asc' ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
    }
    return 0;
  });

  // Pagination logic
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Edit employee
  const handleEdit = (id) => {
    navigate(`/editemployee/${id}`);
  };

  // Delete employee
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:4000/create/employee/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
        const result = await response.json();

        if (response.ok && result.success) {
          setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.f_Id !== id));
          toast.success(result.message);
        } else {
          toast.error(result.message || 'Error deleting employee.');
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error('Error deleting employee.');
      }
    }
  };

  return (
    <div className="min-h-screen dark:text-white bg-gray-100 dark:bg-gray-900">
      <Nav />

      {/* Search and Filter Section */}
      <div className="p-4 bg-lightblue flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name, email, or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded border border-gray-400"
        />
        <label className="ml-4">
          <input
            type="checkbox"
            checked={activeOnly}
            onChange={() => setActiveOnly(!activeOnly)}
            className="mr-2"
          />
          Active Only
        </label>
        <span>Total Count: {filteredEmployees.length}</span>
      </div>

      {/* Employee Table */}
      <table className="w-full border-collapse mt-4 mx-5">
        <thead>
          <tr className="bg-lightblue text-left border-b-2 border-gray-400">
            <th onClick={() => { setSortField('f_Id'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>Unique Id</th>
            <th>Image</th>
            <th onClick={() => { setSortField('f_Name'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>Name</th>
            <th onClick={() => { setSortField('f_Email'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th onClick={() => { setSortField('f_Createdate'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee._id} className="border-b border-gray-400">
              <td>{employee.f_Id}</td>
              <td>
                <img src={employee.f_Image} alt={employee.f_Image} className="w-12 h-12 rounded-full" />
              </td>
              <td>{employee.f_Name}</td>
              <td>
                <a href={`mailto:${employee.f_Email}`} className="text-blue-500 underline">{employee.f_Email}</a>
              </td>
              <td>{employee.f_Mobile}</td>
              <td>{employee.f_Designation}</td>
              <td>{employee.f_gender}</td>
              <td>{employee.f_Course}</td>
              <td>{new Date(employee.f_Createdate).toLocaleDateString()}</td>
              <td>
                <button
                  onClick={() => handleEdit(employee.f_Id)}
                  className="mr-2 px-4 py-2 bg-green-600 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(employee.f_Id)}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        {Array.from({ length: Math.ceil(filteredEmployees.length / employeesPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-black'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmployeeList;
