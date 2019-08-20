const PhoneNumberController = require('./restControllers/phoneBookEntryController')

module.exports = class Router {
    static initRoutes(server) {
        server.get('/api/phone/getAll', PhoneNumberController.getAll)
        server.post('/api/phone/update', PhoneNumberController.update)
        server.post('/api/phone/delete', PhoneNumberController.delete)
        server.post('/api/phone/add', PhoneNumberController.add)
        server.post('/api/phone/upload', PhoneNumberController.upload)
    }
}
