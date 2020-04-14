const dotenv = require('dotenv');

dotenv.config();

module.exports =  {
  PORT: process.env.EXPRESS_PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT: process.env.JWT
};