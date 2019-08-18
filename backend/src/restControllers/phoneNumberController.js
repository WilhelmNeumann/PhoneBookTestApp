const DataBase = require('../dataAccessLayer/dataBase')
const PhoneBookEntryValidator = require('../validators/phoneBookEntryValidator')

module.exports = class PhoneNumberController {

    static async getByName(req, res) {
        if (!req.params.name) {
            res.send({
                requestStatus: 'error',
                message: 'Name is not found or invalid'
            })
        }

        const result = await DataBase.phoneBookEntries.getByName(req.params.name)
        res.send({
            requestStatus: 'ok',
            body: result

        })
    }

    static async getAll(req, res) {
        try {
            console.log('Get all phoneBookEntries')
            const phoneBookEntries = await DataBase.phoneBookEntries.getAll()
            res.send(phoneBookEntries)
        } catch (exception) {
            console.log(exception)
            res.send({
                requestStatus: 'internal server error'
            })
        }
    }

    static async add(req, res) {
        const phoneBookEntry = req.params
        const isValid = PhoneBookEntryValidator.validate(phoneBookEntry)
        if (!isValid) {
            res.send({
                requestStatus: 'error',
                message: 'You tried to send invalid data'
            })
        } else {
            await DataBase.phoneBookEntries.add(phoneBookEntry)
            res.send({requestStatus: 'ok'})
        }
    }

    static async update(req, res, next) {
        console.log('add')
    }

    static async delete(req, res) {
        console.log('add')
    }
}