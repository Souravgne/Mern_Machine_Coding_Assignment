const mongoose = require('mongoose');

// Define the employee schema
const employeeSchema = new mongoose.Schema({
  f_Id: { type: String, unique: true }, // This will now be auto-generated
  // f_Image: { type: String, required: false }, // Store image path or URL
  f_Name: { type: String, required: true },
  f_Email: { type: String, required: true, unique: true },
  f_Mobile: { type: String, required: true },
  f_Designation: { type: String, required: true },
  f_gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  f_Course: { type: String, required: true },
  f_Createdate: { type: Date, default: Date.now }
});

// Add a pre-save hook to auto-generate the f_Id as a 3-digit unique number
employeeSchema.pre('save', async function (next) {
  const employee = this;

  // Only generate f_Id if it's a new document (not updating existing ones)
  if (employee.isNew) {
    try {
      // Fetch the maximum f_Id currently present in the collection
      const lastEmployee = await Employee.findOne().sort({ f_Id: -1 });

      // If there's a previous employee, increment the f_Id, otherwise start from 100
      const newId = lastEmployee ? parseInt(lastEmployee.f_Id) + 1 : 100;

      // Ensure the new ID is 3 digits
      if (newId > 999) {
        throw new Error('Max employee limit reached (999 IDs).');
      }

      employee.f_Id = newId.toString();
    } catch (error) {
      return next(error);
    }
  }

  next();
});

// Create the model using the schema
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
