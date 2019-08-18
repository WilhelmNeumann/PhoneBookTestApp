const PhoneNumberController = require('./restControllers/phoneNumberController')

module.exports = class Router {
    static initRoutes(server) {
        server.get('/api/phone/get', PhoneNumberController.getByName)
        server.get('/api/phone/getAll', PhoneNumberController.getAll)
        server.post('/api/phone/update', PhoneNumberController.update)
        server.post('/api/phone/delete', PhoneNumberController.delete)
        server.post('/api/phone/add', PhoneNumberController.add)
    }
}