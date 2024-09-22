const Joi = require('joi');

// Define the Joi validation schema for an employee
const employeeSchema = Joi.object({
  // f_Id should not be provided during creation (POST), but allowed during updates (PUT)
  f_Id: Joi.string().optional(), // Auto-generated, so not required in request body
  // f_Image: Joi.string().optional(),  // Optional field for image path or URL
  f_Name: Joi.string().required().messages({
    'string.empty': 'Name is required'
  }),
  f_Email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please enter a valid email address'
  }),
  f_Mobile: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
    'string.pattern.base': 'Mobile number must be 10 digits',
    'string.empty': 'Mobile number is required'
  }),
  f_Designation: Joi.string().required().messages({
    'string.empty': 'Designation is required'
  }),
  f_gender: Joi.string().valid('Male', 'Female', 'Other').required().messages({
    'any.only': 'Gender must be either Male, Female, or Other',
    'string.empty': 'Gender is required'
  }),
  f_Course: Joi.string().required().messages({
    'string.empty': 'Course is required'
  }),
  f_Createdate: Joi.date().default(Date.now),
});

// Middleware function to validate employee data
const validateEmployee = (req, res, next) => {
  const { method } = req;

  // Determine if it's an update operation
  const isUpdate = method === 'PUT';

  // Validate request body with the schema, passing 'isUpdate' to the schema context
  const { error } = employeeSchema.validate(req.body, { context: { isUpdate } });

  // If validation fails, return a 400 error with the error message
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // If validation passes, proceed to the next middleware or route handler
  next();
};

module.exports = validateEmployee;
