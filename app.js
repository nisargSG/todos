const { appConfig } = require('./package.json')
const express = require("express")
const  {prepareDBConnection}  = require('./utils')
const chalk = require('chalk');

//instance of express
const app = express()

//middlewars
const { requestLogger } = require('./middlewares/requestLogger')

//routers
const { routerAPI } = require('./routers/routerAPI')
const { routerUI } = require('./routers/routerUI')

app.set('view engine', 'pug')

//in case you want to change view directory
//app.set('views', libPath.join(__dirname, '/templates'));

app.use(requestLogger)
//Api Router
app.use("/api", routerAPI)
//Web page
app.use(routerUI)
//Web page


prepareDBConnection().then((dbTodo) => {
  console.log(chalk.green("[+]DB is Connected"))
  dbTodo.collection("items").insertOne({"daw":"dawda"})
  app.listen(appConfig.port, () => {
    console.log(chalk.green(`[+]App is Running on Port ${appConfig.port}`))
  })
}).catch((e) => {console.log(chalk.red(`[-]DB Connection Failed ${e}`))})