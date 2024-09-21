const express = require('express');
const ensureAuthenticated = require('../Middlewares/Auth');
const router = express.Router(); // Use express.Router() explicitly


router.get('/', ensureAuthenticated ,  (req, res)=>{
    res.status(200).json([
        { id: 1, name: 'John Doe', age: 30 },
        { id: 2, name: 'Jane Smith', age: 25 },
        { id: 3, name: 'Alice Johnson', age: 35 }
    ])
})




module.exports = router;
