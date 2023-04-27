const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserRepository = require('../repository/user-repository');
const { JWT_SECRET } = require('../config/serverConfig');

class UserService{

    constructor() {
        this.userRepository = new UserRepository();
    }

    #createToken(user){
        try{
            const result = jwt.sign(user, JWT_SECRET, { expiresIn: '1d' });
            return result;
        }catch(err){
            console.log('Something went wrong in token creation');
            throw err;
        }
    }

    #verifyToken(token){
        try{
            const decoded = jwt.verify(token, JWT_SECRET);
            return decoded;
        }catch(err){
            console.log(err);
            throw err;
        }
    }

    #checkPassword(userInputPassword, encryptedPassword){
        try{
            return bcrypt.compareSync(userInputPassword,encryptedPassword);
        }catch(err){
            console.log('Something went wrong in password comparison');
            throw err;
        }
    }
    async create(data){
        try{
            const user = await this.userRepository.create(data);
            const newJWT = this.#createToken({email: user.email, id:user.id});
            return newJWT;
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

    async get(userId){
        try{
            const suer = await this.userRepository.get(userId);
        }catch(err){
            console.log('Something went wrong at service layer');
            throw err;
        }
    }

    async signin(email, password){
        try{
            const user = await this.userRepository.getByEmail(email);
            const passwordMatch = this.#checkPassword(password,user.password);
            if(!passwordMatch){
                console.log('Wrong Password')
                throw {error: 'incorrect password'};
            }
            const newJWT = this.#createToken({email: user.email, id:user.id});
            return newJWT;
        }catch(err){
            console.log('Something went wrong in signin service');
            throw err;
        }
    }
}

module.exports = UserService;