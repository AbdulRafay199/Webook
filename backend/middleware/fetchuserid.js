const jwt = require('jsonwebtoken');
const jwtseckey = "rafayabdulwebookapp2002123";

const fetchuser = (req,res,next)=>{
    try {
        const authtoken = req.header("auth-token");
        const data = jwt.verify(authtoken,jwtseckey);
        if(!authtoken){
            res.status(401).json("Please enter a valid token");
        }
        else{
            req.user = data.user;
            next();
        }
    } catch (error) {
        console.log(error);
        res.json("internal error occurred");
    }
}

module.exports = fetchuser;