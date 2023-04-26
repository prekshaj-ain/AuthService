const { User } = require('../models/index');

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
}
module.exports = UserRepository;