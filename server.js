const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const config = require('./config');
const passport = require("passport");
const employeesRouter = require('./routes/employees');
const usersRouter = require("./routes/users");
const { PORT } = config;

app.use(
    helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }),
    helmet.frameguard({action: 'deny'}),
    helmet.xssFilter(),
    helmet.noSniff(),
    helmet.ieNoOpen(),
    helmet.dnsPrefetchControl(),
    helmet.noCache()
);
app.use(cors());
app.use(express.json());

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(bodyParser.json());

// DB Config
// const { MONGO_URI } = config;
// const uri = `${MONGO_URI}`;
const db = require('./config').MONGO_URI;
mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Connected to MongoDB database.')
});

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/users", usersRouter);
app.use('/employees', employeesRouter);

const port = process.env.PORT || `${PORT}`;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});