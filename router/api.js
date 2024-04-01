const libExpress = require('express');

const apiRouter = libExpress.Router()

apiRouter.use("/student",require('./student'))
//apiRouter.use("/teacher",)
//apiRouter.use("/books",)

apiRouter.use("*",(req,res)=>{
    res.status(404).json({error:"Invalid API"})
})



module.exports = apiRouter