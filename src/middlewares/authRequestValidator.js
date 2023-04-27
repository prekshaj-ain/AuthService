const validateUser = (req,res,next)=>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            data: {},
            success: false,
            message: "you must provide email and password",
            error: "Email or password is Missing",
        })
    }
    next();
}

module.exports = {
    validateUser
}