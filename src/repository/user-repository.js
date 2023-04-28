const { User, Role } = require('../models/index');

class UserRepository{
    async create(data){
        try{
            const user = await User.create(data);
            return user;
        }catch(err){
            console.log('Something went wrong on Repository layer')
            throw {err};
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
            throw {err};
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
            throw {err};
        }
    }

    async getByEmail(email){
        try{
            const user = await User.findOne({
                where: {
                    email: email
                }
            });
            return user;
        }catch(err){
            console.log('Something went wrong on Repository layer')
            throw {err};
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