const restify = require('restify')
const corsMiddleware = require('restify-cors-middleware')
const Logger = require('./logger')

module.exports = {

    /**
     * Initialize resify server
     * @param config - server configuration
     */
    create: config => {
        const server = restify.createServer();

        const cors = corsMiddleware({
            preflightMaxAge: 5,
            origins: ['*'],
            allowHeaders: ['X-App-Version'],
            exposeHeaders: []
        })

        server.use(cors.actual)
        server.pre(cors.preflight)
        server.pre(restify.plugins.acceptParser(server.acceptable))
        server.use(restify.plugins.multipartBodyParser())
        server.use(restify.plugins.bodyParser())
        server.use(restify.plugins.queryParser())

        server.listen(config.port, () => Logger.info(`Restify listening on ${config.host}:${config.port}`))
        return server
    }
}
