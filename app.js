//init params
require('dotenv').config();
//express
const express = require("express");
//util
const util = require('./util');
//middlwares
const requestInterceptor= require('./middleware/requestInterceptor');
//Express APP
const app = express();
//Assign Middlewares
app.use(requestInterceptor)
//Start Exporess APP
app.listen(process.env.APP_PORT, () => util.logger(`Example app listening on port ${process.env.APP_PORT}`,"success"));

