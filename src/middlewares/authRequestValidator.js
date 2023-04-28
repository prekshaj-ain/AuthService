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

const validateIsAdminRequest = (req,res,next)=>{
    if(!req.body.id){
        return res.status(400).json({
            data: {},
            success: false,
            message: "you must provide userId",
            error: "userId is Missing",
        })
    }
    next();
}

module.exports = {
    validateUser,
    validateIsAdminRequest
}