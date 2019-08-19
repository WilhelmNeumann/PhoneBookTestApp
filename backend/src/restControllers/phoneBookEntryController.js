const DataBase = require('../dataAccessLayer/dataBase')
const PhoneBookEntryValidator = require('../validators/phoneBookEntryValidator')

module.exports = class PhoneNumberController {

    static async getAll(req, res) {
        try {
            console.log('Get all phone numbers')
            const phoneBookEntries = await DataBase.phoneBookEntries.getAll()
            res.send(phoneBookEntries)
        } catch (exception) {
            console.log(exception)
            res.send({
                requestStatus: 'error'
            })
        }
    }

    static async add(req, res, next) {
        console.log('Add new phone number')
        const phoneBookEntry = req.body
        const isValid = PhoneBookEntryValidator.validate(phoneBookEntry)
        if (isValid) {
            await DataBase.phoneBookEntries.add(phoneBookEntry)
            res.send({requestStatus: 'ok'})
        } else {
            res.send({
                requestStatus: 'error',
                message: 'You tried to send invalid data'
            })
        }
        return next()
    }

    static async update(req, res, next) {
        console.log('Update phone number')
    }

    static async delete(req, res) {
        console.log('Delete phone number')
        const phoneBookEntry = JSON.parse(req.body)
        const isValid = PhoneBookEntryValidator.validate(phoneBookEntry)
        if (isValid) {
            await DataBase.phoneBookEntries.delete(phoneBookEntry)
            res.send({requestStatus: 'ok'})
        } else {
            res.send({
                requestStatus: 'error',
                message: 'You tried to send invalid data'
            })
        }
    }
}
