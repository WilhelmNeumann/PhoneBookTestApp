const mongoose = require("mongoose");

module.exports = class PhoneBookEntryRepository {

    constructor() {
        const phoneBookEntrySchema = new mongoose.Schema({
            name: String,
            phoneNumber: String
        })

        this._phoneBookEntryModel = mongoose.model("PhoneBookEntry", phoneBookEntrySchema)
    }

    async getAll() {
        return this._phoneBookEntryModel.find();
    }

    async getByName(name) {
        return this._phoneBookEntryModel.find({name: name});
    }

    async add(phoneBookEntry) {
        const entry = new this._phoneBookEntryModel(phoneBookEntry)
        await entry.save(err => {
            if (err) console.log(err)
        })
    }

    update(entry) {

    }

    delete(entry) {

    }
}
