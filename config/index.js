const dotenv = require('dotenv');

dotenv.config();

module.exports =  {
  PORT: 7000,
  MONGO_URI: process.env.MONGO_URI,
  secretOrKey: "secret"
};