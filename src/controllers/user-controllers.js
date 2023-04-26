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
        return res.status(500).json({
            data: {},
            success: false,
            message: "not able to create the user",
            error: error
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

const get = async (req,res)=>{
    try{
        const response = await userService.get(req.params.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: "User fetched successfully",
            error: {}
        })
    }catch(error){
        return res.status(500).json({
            data: {},
            success: false,
            message: "not able to fetch the user",
            error: error
        })
    }
}

module.exports = {
    create,
    destroy,
    get
}