const { appConfig } = require('./package.json')

const libMongoDB = require('mongodb')



async function prepareDBConnection() {
    const mongoServerConnection= await libMongoDB.MongoClient.connect(appConfig.mongoDbURL);
    return mongoServerConnection.db(appConfig.mongoDBName)
}


module.exports = {prepareDBConnection:prepareDBConnection}