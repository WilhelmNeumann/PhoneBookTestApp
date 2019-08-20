const PhoneBookEntryRepository = require('./phoneBookEntryRepository')
const mongoose = require('mongoose')
const Logger = require('./../logger')

/**
 * Initializes a database and stores repositories for data access
 */
module.exports = {
    phoneBookEntries: new PhoneBookEntryRepository(),
    connect: async config => {
        try {
            await mongoose.connect(`mongodb://${config.host}:${config.port}/${config.dbName}`, {useNewUrlParser: true})
            Logger.info('Successfully connected to mongodb')
        } catch (exception) {
            Logger.error('Error connecting to mongodb')
            throw exception
        }
    }
}
