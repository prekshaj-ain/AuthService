const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req,res)=>{
    try{
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        })
        return res.status(201).json({
            data: response,
            success: true,
            message: "User created successfully",
            error: {}
        })
    }catch(error){
        return res.status(error.statusCode).json({
            data: {},
            success: false,
            message: error.message,
            error: error.explanation
        })
    }
}

const destroy = async (req,res)=>{
    try{
        const response = await userService.destroy(req.params.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: "User deleted successfully",
            error: {}
        })
    }catch(error){
        return res.status(500).json({
            data: {},
            success: false,
            message: "not able to delete the user",
            error: error
        })
    }
}

const signin = async (req,res)=>{
    try{
        const response = await userService.signin(req.body.email,req.body.password);
        return res.status(200).json({
            data: response,
            success: true,
            message: "SignIn successful",
            error: {}
        }); 
    }catch(error){
        return res.status(500).json({
            data: {},
            success: false,
            message: "Something went wrong",
            error: error
        })
    }
}

const isAuthenticated = async (req,res)=>{
    try{
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'user is Authenticated and token is valid',
            error: {}
        });
    }catch(error){
        return res.status(500).json({
            data: {},
            success: false,
            message: "Something went wrong",
            error: error
        })
    }
}

const isAdmin = async (req,res)=>{
    try{
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'successfully fetched whether user is admin or not',
            error: {}
        });
    }catch(error){
        return res.status(500).json({
            data: {},
            success: false,
            message: "Something went wrong",
            error: error
        })
    }
}

module.exports = {
    create,
    destroy,
    signin,
    isAuthenticated,
    isAdmin
}