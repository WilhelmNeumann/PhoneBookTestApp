const config = require('config')
const Server = require('./server')
const Router = require('./router')
const DataBase = require('./dataAccessLayer/dataBase')


const main = async () => {

    //create store
    //business logic(store)
    //rest controller(business model)

    const applicationConfig = config.get("Application")
    const server = Server.create(applicationConfig.server)
    Router.initRoutes(server)
    await DataBase.connect(applicationConfig.dataBase)
}

main()



