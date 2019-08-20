const mongoose = require("mongoose");

module.exports = class PhoneBookEntryRepository {

    /**
     * Repository of phone book entries.
     * Contains methods for working with entries in the database
     */
    constructor() {
        const phoneBookEntrySchema = new mongoose.Schema({
            name: String,
            phoneNumber: String,
            lastModified: Date
        })

        this._phoneBookEntryModel = mongoose.model("PhoneBookEntry", phoneBookEntrySchema)
    }

    async getAll() {
        return this._phoneBookEntryModel.find()
    }

    async getByPersonName(personName) {
        const result = await this._phoneBookEntryModel.findOne({name: personName})
        return result
    }

    async add(phoneBookEntry) {
        const entry = new this._phoneBookEntryModel(phoneBookEntry)
        entry.lastModified = Date.now()
        await entry.save(err => {
            if (err) console.log(err)
        })
    }

    async update(phoneBookEntry) {
        const entry = await this._phoneBookEntryModel.findOne({name: phoneBookEntry.name})
        entry.lastModified = Date.now()
        entry.phoneNumber = phoneBookEntry.phoneNumber
        await entry.save(err => {
            if (err) console.log(err)
        })
    }

    async delete(phoneBookEntry) {
        await this._phoneBookEntryModel.deleteOne({name: phoneBookEntry.name}, err => {
            if (err) console.log(err)
        })
    }
}
