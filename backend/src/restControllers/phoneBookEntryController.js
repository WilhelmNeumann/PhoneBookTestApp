const DataBase = require('../dataAccessLayer/dataBase')
const PhoneBookEntryValidator = require('../validators/phoneBookEntryValidator')
const ResponseFactory = require('../responseFactory')
const fs = require('fs');

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
        console.log('Download as file')

        res.send(202, {message: 'File uploaded'});
        res.send(ResponseFactory.createSuccessResponse())
    }
}
