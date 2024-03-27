//util
const util = require('../util');

module.exports = (req,res,next)=>{

    util.logger(`Incoming Request [${req.method}] ---> ${req.originalUrl}`)
    next();
}