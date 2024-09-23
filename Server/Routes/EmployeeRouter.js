const express = require('express');
const validateEmployee = require('../Middlewares/EmployeeValidation');
const { createEmployee, updateEmployee, deleteEmployee, getAllEmployees, getEmployeeDetails } = require('../Controllers/EmployeeController');
const upload = require('../Middlewares/Multer')
const router = express.Router(); 
const fs = require('fs')

const { uploadOnCloudinary } = require('../utils/cloudinary') ;

// Create a new employee
router.post('/createemployee', upload.single('f_Image'), validateEmployee, async (req, res) => {
    console.log("Received:", req.body);

    if (req.file) {
        const localFilePath = req.file.path; // Path to the uploaded file

        try {
            // Upload to Cloudinary
            const cloudinaryUrl = await uploadOnCloudinary(localFilePath);
            console.log("gotch", cloudinaryUrl)
            // Update req.body to include the Cloudinary URL
            req.body.f_Image = cloudinaryUrl;
            await fs.promises.unlink(localFilePath);
            // Call createEmployee function with the updated req and res
            await createEmployee(req, res);

        } catch (error) {
            console.error('Error uploading to Cloudinary:', error);
            return res.status(500).json({ message: 'Error uploading file to Cloudinary', error });
        }
    } else {
        return res.status(400).json({ message: 'No file uploaded' });
    }
});

// Get all employees
router.get('/employees', getAllEmployees);
router.get('/employee/:id', getEmployeeDetails);

// Update an employee by ID
router.put('/employee/:id', validateEmployee, updateEmployee);

// Delete an employee by ID
router.delete('/employee/:id', deleteEmployee);

module.exports = router;
