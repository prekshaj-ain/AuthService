const UserRepository = require('../repository/user-repository');

class UserService{

    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data){
        try{
            const user = await this.userRepository.create(data);
            return user; 
        }catch(err){
            console.log('Something went wrong at service layer');
            throw err;
        }
    }
    async destroy(userId){
        try{
            await this.userRepository.destroy(userId);
            return true;
        }catch(err){
            console.log('Something went wrong at service layer');
            throw err;
        }
    }
}

module.exports = UserService;