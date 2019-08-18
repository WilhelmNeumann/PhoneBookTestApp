const mongoose = require("mongoose");

module.exports = class PhoneBookEntryRepository {

    constructor() {
        const phoneBookEntrySchema = new mongoose.Schema({
            name: String,
            phoneNumber: String,
            lastModified: Date
        })

        this._phoneBookEntryModel = mongoose.model("PhoneBookEntry", phoneBookEntrySchema)
    }

    async getAll() {
        return this._phoneBookEntryModel.find();
    }

    async add(phoneBookEntry) {
        const entry = new this._phoneBookEntryModel(phoneBookEntry)
        entry.lastModified = Date.now()
        await entry.save(err => {
            if (err) console.log(err)
        })
    }

    update(entry) {

    }

    async delete(phoneBookEntry) {
        await this._phoneBookEntryModel.deleteOne({name: phoneBookEntry.name}, err => {
            if (err) console.log(err)
        })
    }
}
