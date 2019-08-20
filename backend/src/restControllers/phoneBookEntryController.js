const DataBase = require('../dataAccessLayer/dataBase')
const PhoneBookEntryValidator = require('../validators/phoneBookEntryValidator')
const ResponseFactory = require('../responseFactory')
const Synchronizer = require('./../synchronizer')
const Logger = require('./../logger')

/**
 * A controller that provides rest methods for working with phone book entries
 */
module.exports = class PhoneNumberController {

    static async getAll(req, res) {
        Logger.info('Get all phone numbers')
        try {
            const phoneBookEntries = await DataBase.phoneBookEntries.getAll()
            const response = ResponseFactory.createSuccessResponse(phoneBookEntries)
            res.send(response)
        } catch (exception) {
            Logger.error(exception)
            const response = ResponseFactory.createErrorResponse()
            res.send(response)
        }
    }

    static async add(req, res) {
        Logger.info('Add new phone number')
        try {
            const phoneBookEntry = req.body

            const isValid = PhoneBookEntryValidator.validate(phoneBookEntry)
            if (!isValid) {
                const response = ResponseFactory.createErrorResponse('You have sent invalid data, please try again')
                res.send(response)
                return
            }

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

        } catch (exception) {
            Logger.error(exception)
            const response = ResponseFactory.createErrorResponse()
            res.send(response)
        }
    }

    static async update(req, res) {
        Logger.info('Update phone number')
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
            Logger.error(exception)
            const response = ResponseFactory.createErrorResponse()
            res.send(response)
        }
    }

    static async delete(req, res) {
        Logger.info('Delete phone number')
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
            Logger.error(exception)
            const response = ResponseFactory.createErrorResponse()
            res.send(response)
        }
    }

    static async upload(req, res) {
        Logger.info('Update data base')
        try {
            const phoneBook = req.body.phoneBook
            await Synchronizer.updateDataBase(phoneBook)
            const response = ResponseFactory.createSuccessResponse('Data base was successfully updated')
            res.send(response)
        } catch (exception) {
            Logger.error(exception)
            const response = ResponseFactory.createErrorResponse()
            res.send(response)
        }
    }
}
