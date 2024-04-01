//init params
require('dotenv').config();
//express
const libExpress = require("express");
//util
const util = require('./util');
//middlwares
const requestInterceptor= require('./middleware/requestInterceptor');
//routes
const apiRouter = require('./router/api')
//Express APP
const app = libExpress();
//Assign Middlewares
app.use(requestInterceptor);
//convert incoming body into json
app.use(libExpress.json());

//Decide Req UI - API
//API
app.use("/api",apiRouter)

//UI
//app.use()

//Start Exporess APP
app.listen(process.env.APP_PORT, () => util.logger(`Example app listening on port ${process.env.APP_PORT}`,"success"));

