const express = require('express');
const { signUpValidation, loginValidation } = require('../Middlewares/AuthValidation');
const { signup ,login} = require('../Controllers/AuthController');
const router = express.Router(); // Use express.Router() explicitly


router.post('/signup', signUpValidation, signup)
router.post('/login', loginValidation, login)




module.exports = router;
