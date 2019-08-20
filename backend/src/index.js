const config = require('config')
const Server = require('./server')
const Router = require('./router')
const DataBase = require('./dataAccessLayer/dataBase')


/**
 * Application entry point
 * @param applicationConfig - configuration
 */
const main = async applicationConfig => {
    const server = Server.create(applicationConfig.server)
    Router.initRoutes(server)
    await DataBase.connect(applicationConfig.dataBase)
}

const applicationConfig = config.get("application")
main(applicationConfig)



