const express = require('express')
const routerAPI = express.Router()

const {routesUser} = require('../model/modelUser')

const controllerAPI={}

controllerAPI.dbConnection = getDBConnection();


//[+] Manage User APIs
routerAPI.get("/user/:id",(req,res,next)=>{
    res.status(200).json(modelUser.getUserById(controllerAPI.dbConnection,req.params.id))
})
routerAPI.get("/user",routesUser.getAllUsers )
routerAPI.post("/user",routesUser.createUser)
routerAPI.put("/user/:id", routesUser.updateUser)
routerAPI.delete("/user/:id", routesUser.deleteUser)

//[+] Manage User TODOs
routerAPI.get("/todo",(req,res,next)=>{res.send({"todo":[]})})

//[+]Manage Unhandled API Requests
routerAPI.all('*',(req, res, next) => {res.send({"error":"invalid api"}) })

module.exports.routerAPI=routerAPI