const PhoneBookEntryRepository = require('./phoneBookEntryRepository')
const mongoose = require('mongoose')


module.exports = {
    phoneBookEntries: new PhoneBookEntryRepository(),
    connect: async config => {
        try {
            await mongoose.connect(`mongodb://${config.host}:${config.port}/${config.dbName}`, {useNewUrlParser: true})
            console.log('Successfully connected to mongodb')
        } catch (e) {
            console.error('Error connecting to mongodb')
            console.log(e)
        }
    }
}
