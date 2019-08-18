const config = require('config')
const Server = require('./src/server')
const Router = require('./src/router')
const DataBase = require('./src/dataAccessLayer/dataBase')


const main = async () => {
    const applicationConfig = config.get("Application")
    const server = Server.create(applicationConfig.server)
    Router.initRoutes(server)
    await DataBase.connect(applicationConfig.dataBase)
}

main()



