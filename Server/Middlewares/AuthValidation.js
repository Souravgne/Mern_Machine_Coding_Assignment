const Joi = require('joi');

// Signup validation
const signUpValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Validation Error", 
            error: error.details[0].message // Send specific error message
        });
    }
    next();
};

// Login validation
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Validation Error", 
            error: error.details[0].message // Send specific error message
        });
    }
    next();
};

module.exports = { signUpValidation, loginValidation };
