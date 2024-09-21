const UserModel = require("../Models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "User already exists!", success: false });
        }

        // Create new user
        const newUser = new UserModel({ name, email, password });
        newUser.password = await bcrypt.hash(password, 10); // Hash the password

        // Save the user in the database
        await newUser.save();

        res.status(201).json({
            message: "Signup Success", 
            success: true
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal Server Error", 
            success: false
        });
    }
};
const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        
        // Check if user already exists
        const user = await UserModel.findOne({ email });
        const errormsg = "Authentication failed email or password is wrong!"
        if (!user) {
            return res.status(403).json({ message:errormsg, success: false });
        }

       const isPassEqual = await bcrypt.compare(password , user.password); 
       if(!isPassEqual){
        return res.status(403).json({ message:errormsg, success: false });

       }
       const jwtToken = jwt.sign({email:user.email, _id:user._id} ,
        process.env.JWT_SECRET,
        { expiresIn: '24h' } 

       )

        res.status(200).json({
            message: "Login Success", 
            success: true, 
            jwtToken,
            email,
            name :user.name
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal Server Error", 
            success: false
        });
    }
};

module.exports = {
    signup,
    login
};
