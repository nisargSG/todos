const chalk = require('chalk');
const libMoment = require('moment')

//util object
const util = {}

//util chalk color picker
util.logChalkPicker = {
    "warning": chalk.yellow,
    "error": chalk.red,
    "success": chalk.green,
    "common": chalk.white,
}

//util log sign picker
util.logSignPicker = {
    "warning": "[!]",
    "error": "[-]",
    "success": "[+]",
    "common": "[*]",
}

//log printer
util.logger = (msg, type = "common") => {
    console.log(util.logChalkPicker[type](`${util.logSignPicker[type]}${libMoment().format('DD-MM-YYYY HH:mm')} : ${msg}`))
}


//export util
module.exports = util