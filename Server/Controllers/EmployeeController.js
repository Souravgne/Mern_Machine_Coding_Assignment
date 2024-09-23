const Employee = require('../models/Employee');

// Controller to create a new employee
// exports.createEmployee = async (req, res) => {
//   try {
//     console.log(req.file)
//     const employee = new Employee(req.body);
//     await employee.save();
//     res.status(201).json({ message: 'Employee created successfully', employee , success: true });
//   } catch (error) {
//     res.status(400).json({ error: error.message , success: false });
//   }
// };

exports.createEmployee = async (req, res) => {
  console.log("gola chola sourav " , req.body)
  console.log("gola chola sourav " , req.file)
  try {
    // Check if the file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'File upload is required', success: false });
    }

    // Access the uploaded file details (such as the file path)
    const filePath = req.file.path; // This is where the file is saved (e.g., /uploads/filename.jpg)

    // Create a new employee with req.body and include the file path in the employee data
    const employee = new Employee({
      ...req.body // Add the uploaded file path to the f_Image field
    });

    // Save the employee to the database
    await employee.save();

    // Respond with success
    res.status(201).json({ message: 'Employee created successfully', employee, success: true });
  } catch (error) {
    // Handle errors
    res.status(400).json({ error:"gola chola " , success: false });
  }
};



// Controller to get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message , success: false });
  }
};

// Controller to update an employee by ID
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOneAndUpdate(
      { f_Id: req.params.id }, // Use the f_Id from the URL parameter
      req.body,
      { new: true }
    );
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee updated successfully', employee , success: true });
  } catch (error) {
    res.status(500).json({ error: error.message , success: false });
  }
};

// Controller to delete an employee by ID
exports.deleteEmployee = async (req, res) => {
  console.log(req.params.id)
  try {
    
    const employee = await Employee.findOneAndDelete({ f_Id: req.params.id });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' , success: false });
    }
    res.status(200).json({ message: 'Employee deleted successfully' , success: true });
  } catch (error) {
    res.status(500).json({ error: error.message , success: false });
  }
};

exports.getEmployeeDetails = async (req, res) => {
  try {
    const employee = await Employee.findOne({ f_Id: req.params.id });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found', success: false });
    }
    res.status(200).json({ employee, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
};
