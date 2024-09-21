const jwt = require('jsonwebtoken'); 
const ensureAuthenticated = (req , res , next)=>{

    const auth = req.headers['authorization']; 
    if(!auth){
        return res.status(403)
        .json({error: 'No token, authorization denied'});
    }
    console.log("hellow")
    try{
         const decoded = jwt.verify(auth , process.env.JWT_SECRET);
         req.user = decoded; 
         next(); 
    }
    catch(err){
        return res.status(403)
        .json({error: 'Token is not valid'});
    }
}

module.exports = ensureAuthenticated;