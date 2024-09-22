const express = require('express');
const validateEmployee = require('../Middlewares/EmployeeValidation');
const { createEmployee, updateEmployee, deleteEmployee, getAllEmployees, getEmployeeDetails } = require('../Controllers/EmployeeController');

const router = express.Router(); 

// Create a new employee
router.post('/createemployee', validateEmployee, createEmployee);

// Get all employees
router.get('/employees', getAllEmployees);
router.get('/employee/:id', getEmployeeDetails);

// Update an employee by ID
router.put('/employee/:id', validateEmployee, updateEmployee);

// Delete an employee by ID
router.delete('/employee/:id', deleteEmployee);

module.exports = router;
