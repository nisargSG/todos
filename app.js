const { appConfig } = require('./package.json')
const express = require("express")
const  {getDBConnection}  = require('./utils')
const chalk = require('chalk');
//middlewars
const { requestLogger } = require('./middlewares/requestLogger')
//routers
const { routerAPI } = require('./routers/routerAPI')
const { routerUI } = require('./routers/routerUI')


//instance of express
const app = express()

app.set('view engine', 'pug')

//in case you want to change view directory
//app.set('views', libPath.join(__dirname, '/templates'));

app.use(requestLogger)

//Api Router
app.use("/api", routerAPI)
//Web page
app.use(routerUI)
//Web page

getDBConnection().then((dbToDo)=>{
  console.log(chalk.green("[+]DB is Connected"))
  app.listen(appConfig.port, () => {
    console.log(chalk.green(`[+]App is Running on Port ${appConfig.port}`))
  })
}).catch((e)=>{
  console.log(chalk.red(`[-]DB Connection Failed ${e}`))
})