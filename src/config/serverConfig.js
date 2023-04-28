const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    JWT_SECRET : process.env.JWT_SECRET,
    DB_SYNC : process.env.DB_SYNC
}