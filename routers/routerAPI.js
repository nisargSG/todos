const express = require('express')
const routerAPI = express.Router()
const  {getDBConnection}  = require('../utils')
const chalk = require('chalk');


//send back sepcific user
routerAPI.get("/user/:id",(req,res,next)=>{

    getDBConnection().then(async (dbToDo)=>{
        const searchId=req.params.id;
        console.log(searchId)
        const foundUser = await dbToDo.collection("users").findOne({id:searchId})
        res.status(200).json({"data":foundUser})

    }).catch((e)=>{

        console.log(e+"Error")
        res.status(500).json({"error":"failed to load data"})
    })


})

//all users return
routerAPI.get("/user", (req,res,next)=>{
    
    getDBConnection().then(async (dbToDo)=>{

        const usersData=await dbToDo.collection("users").find().toArray()
        console.log(usersData)
        res.status(200).json({"data":usersData})


    }).catch((e)=>{
        console.log("Error")
        res.status(500).json({"error":"failed to load data"})
    });

})

//get method - read

//put - update

//delete - delete



routerAPI.get("/todo",(req,res,next)=>{res.send({"todo":[]})})
routerAPI.all('*',(req, res, next) => {res.send({"error":"invalid api"}) })

module.exports.routerAPI=routerAPI