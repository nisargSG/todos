const libExpress = require('express');
const util = require('../util')

const { ObjectId } = require('mongodb');


const studentRouter = libExpress.Router()

//get all student
studentRouter.get("/", (req, res) => {

    util.getDBConnection(function (dbConnection) {
        if (dbConnection) {
            dbConnection.db(process.env.MONGO_DB).collection("student").find().toArray()
                .then(data => res.status(200).json({ data: data }))
                .catch((e) => {
                    util.logger(e, "error")
                    res.status(500).json({ error: "Failed To Load Data" })
                })
                .finally(() => {
                    dbConnection.close()
                })
        }
        else {
            res.status(500).json({ error: "Internal Server Error" })
        }
    })

})

//get one studet only
studentRouter.get("/:id", (req, res) => {

    util.getDBConnection(function (dbConnection) {
        if (dbConnection) {
            dbConnection.db(process.env.MONGO_DB).collection("student").findOne({ _id: new ObjectId(req.params.id) })
                .then(data => res.status(200).json({ data: data }))
                .catch((e) => {
                    util.logger(e, "error")
                    res.status(500).json({ error: "Failed To Load Data" })
                })
                .finally(() => {
                    dbConnection.close()
                })
        }
        else {
            res.status(500).json({ error: "Internal Server Error" })
        }
    })

})

//create a new student
studentRouter.post("/", (req, res) => {

    util.getDBConnection(function (dbConnection) {

        if (dbConnection) {
            dbConnection.db(process.env.MONGO_DB).collection("student").insertOne({
                name: req.body.name,
                technology: req.body.technology,
            })
                .then(data => res.status(200).json({ data: data }))
                .catch((e) => {
                    util.logger(e, "error")
                    res.status(500).json({ error: "Failed To Insert Data" })
                })
                .finally(() => {
                    dbConnection.close()
                })
        }
        else {
            res.status(500).json({ error: "Internal Server Error" })
        }


    })
})

//update entire student
studentRouter.put("/:id", (req, res) => {

    util.getDBConnection(function(dbConnection){

        if (dbConnection) {

            dbConnection.db(process.env.MONGO_DB).collection("student").updateOne({_id:new ObjectId(req.params.id)},{
                $set: {
                  // Your update fields
                  name:req.body.name,
                  technology: req.body.technology
                }
              })
              .then(data => res.status(200).json({ data: data }))
                .catch((e) => {
                    util.logger(e, "error")
                    res.status(500).json({ error: "Failed To Update Data" })
                })
                .finally(() => {
                    dbConnection.close()
                })

        }else {
            res.status(500).json({ error: "Internal Server Error" })
        }

    })


})

//update only some feilds
studentRouter.patch("/:id", (req, res) => {

    util.getDBConnection(function(dbConnection){

        if (dbConnection) {

            dbConnection.db(process.env.MONGO_DB).collection("student").updateOne({_id:new ObjectId(req.params.id)},{
                $set:  req.body})
              .then(data => res.status(200).json({ data: data }))
                .catch((e) => {
                    util.logger(e, "error")
                    res.status(500).json({ error: "Failed To Update Data" })
                })
                .finally(() => {
                    dbConnection.close()
                })

        }else {
            res.status(500).json({ error: "Internal Server Error" })
        }

    })



 })

//delete student
studentRouter.delete("/:id", (req, res) => {

    util.getDBConnection(function(dbConnection){

        if (dbConnection) {

            dbConnection.db(process.env.MONGO_DB).collection("student").deleteOne({_id:new ObjectId(req.params.id)})
              .then(data => res.status(200).json({ data: data }))
                .catch((e) => {
                    util.logger(e, "error")
                    res.status(500).json({ error: "Failed To Delete Data" })
                })
                .finally(() => {
                    dbConnection.close()
                })

        }else {
            res.status(500).json({ error: "Internal Server Error" })
        }

    })


 })

//delete all
studentRouter.delete("/", (req, res) => { 
    util.getDBConnection(function(dbConnection){

        if (dbConnection) {

            dbConnection.db(process.env.MONGO_DB).collection("student").deleteMany({})
              .then(data => res.status(200).json({ data: data }))
                .catch((e) => {
                    util.logger(e, "error")
                    res.status(500).json({ error: "Failed To Delete Data" })
                })
                .finally(() => {
                    dbConnection.close()
                })

        }else {
            res.status(500).json({ error: "Internal Server Error" })
        }

    })


})


studentRouter.use("*", (req, res) => {
    res.status(404).json({ error: "Method not supported" })
})


module.exports = studentRouter