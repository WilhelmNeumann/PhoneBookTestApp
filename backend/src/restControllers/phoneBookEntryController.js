const DataBase = require('../dataAccessLayer/dataBase')
const PhoneBookEntryValidator = require('../validators/phoneBookEntryValidator')
const ResponseFactory = require('../responseFactory')
const Synchronizer = require('./../synchronizer')

/**
 * A controller that provides rest methods for working with phone book entries
 */
module.exports = class PhoneNumberController {

    static async getAll(req, res) {
        console.log('Get all phone numbers')
        try {
            const phoneBookEntries = await DataBase.phoneBookEntries.getAll()
            const response = ResponseFactory.createSuccessResponse(phoneBookEntries)
            res.send(response)
        } catch (exception) {
            console.log(exception)
            const response = ResponseFactory.createErrorResponse()
            res.send(response)
        }
    }

    static async add(req, res) {
        console.log('Add new phone number')
        try {
            const phoneBookEntry = req.body
            const isValid = PhoneBookEntryValidator.validate(phoneBookEntry)
            if (isValid) {
                const duplicate = await DataBase.phoneBookEntries.getByPersonName(phoneBookEntry.name)
                if (duplicate) {
                    const response = ResponseFactory.createErrorResponse(
                        `Phone book entry with name ${duplicate.name} is already exist`)
                    res.send(response)
                    return
                }

                await DataBase.phoneBookEntries.add(phoneBookEntry)
                const response = ResponseFactory.createSuccessResponse()
                res.send(response)
            } else {
                const response = ResponseFactory.createErrorResponse('You have sent invalid data, please try again')
                res.send(response)
            }
        } catch (exception) {
            const response = ResponseFactory.createErrorResponse()
            res.send(response)
        }
    }

    static async update(req, res) {
        console.log('Update phone number')
        try {
            const phoneBookEntry = req.body
            const isValid = PhoneBookEntryValidator.validate(phoneBookEntry)
            if (isValid) {
                await DataBase.phoneBookEntries.update(phoneBookEntry)
                const response = ResponseFactory.createSuccessResponse()
                res.send(response)
            } else {
                const response = ResponseFactory.createErrorResponse('You have sent invalid data, please try again')
                res.send(response)
            }
        } catch (exception) {
            const response = ResponseFactory.createErrorResponse()
            res.send(response)
        }
    }

    static async delete(req, res) {
        console.log('Delete phone number')
        try {
            const phoneBookEntry = req.body
            const isValid = PhoneBookEntryValidator.validate(phoneBookEntry)
            if (isValid) {
                await DataBase.phoneBookEntries.delete(phoneBookEntry)
                const response = ResponseFactory.createSuccessResponse()
                res.send(response)
            } else {
                const response = ResponseFactory.createErrorResponse('You have sent invalid data, please try again')
                res.send(response)
            }
        } catch (exception) {
            const response = ResponseFactory.createErrorResponse()
            res.send(response)
        }
    }

    static async upload(req, res) {
        try {
            const phoneBook = req.body.phoneBook
            await Synchronizer.updateDataBase(phoneBook)
            const response = ResponseFactory.createSuccessResponse('File uploaded')
            res.send(response)
        } catch (exception) {
            const response = ResponseFactory.createErrorResponse()
            res.send(response)
        }
    }
}
