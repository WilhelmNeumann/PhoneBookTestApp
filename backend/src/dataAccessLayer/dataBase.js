const PhoneBookEntryRepository = require('./phoneBookEntryRepository')
const mongoose = require('mongoose')


module.exports = {
    phoneBookEntries: new PhoneBookEntryRepository(),
    connect: async config => {
        await mongoose.connect(`mongodb://${config.host}:${config.port}/${config.dbName}`, {useNewUrlParser: true})
        console.log('Connected to mongodb')
    }
}
