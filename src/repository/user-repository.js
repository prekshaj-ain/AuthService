const { StatusCodes } = require("http-status-codes");

const { User, Role } = require('../models/index');
const ClientError = require('../utils/client-error');
const ValidationError = require('../utils/validation-error');

class UserRepository{
    async create(data){
        try{
            const user = await User.create(data);
            return user;
        }catch(err){
            if(err.name === "SequelizeValidationError"){
                throw new ValidationError(err)
            }
            console.log('Something went wrong on Repository layer')
            throw err;
        }
    }
    async destroy(userId){
        try{
            await User.destroy({
                where: {
                    id: userId
                }
            });
            return true;
        }catch(err){
            console.log('Something went wrong on Repository layer')
            throw err;
        }
    }

    async get(userId){
        try{
            const user = await User.findByPk(userId,{
                attributes: ['email','id']
            });
            return user;
        }catch(err){
            console.log('Something went wrong on Repository layer')
            throw err;
        }
    }

    async getByEmail(email){
        try{
            const user = await User.findOne({
                where: {
                    email: email
                }
            });
            if(!user){
                throw new ClientError({
                    name:"AttributesNotFound",
                    message:"Invalid email sent in the request",
                    explanation:"Please check the email, as there is no record corresponding to this email found",
                    statusCode:StatusCodes.NOT_FOUND
                }
                )
            }
            return user;
        }catch(err){
            console.log('Something went wrong on Repository layer')
            throw err;
        }
    }

    async isAdmin(userId){
        try{
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where: {
                    name: 'ADMIN',
                }
            })
            return user.hasRole(adminRole);
        }catch(err){
            console.log('Something went wrong on Repository layer')
            throw {err};
        }
    }
}
module.exports = UserRepository;