const jwt = require('jsonwebtoken')


module.exports= (req,res,next)=>{
    try
    {
        const verifiedUser = jwt.verify(req.headers.authorization.split(" ")[1],'sbs online classes 123')
        next();
    }
    catch(err)
    {
        return res.status(500).json({
            error:"invalid token"
        })
    }
}