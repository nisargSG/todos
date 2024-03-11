const express = require('express')
const routerAPI = express.Router()

routerAPI.get("/user",(req,res,next)=>{res.send({"user":[]})})
routerAPI.get("/todo",(req,res,next)=>{res.send({"todo":[]})})

routerAPI.all('*',(req, res, next) => {res.send({"error":"invalid api"}) })


module.exports.routerAPI=routerAPI