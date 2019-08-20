const restify = require('restify')
const corsMiddleware = require('restify-cors-middleware')

module.exports = {
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
        server.use(restify.plugins.bodyParser(
            {
                mapParams: true,
                mapFiles: true,
                keepExtensions: true,
            }
        ))
        server.use(restify.plugins.queryParser())
        server.use(restify.plugins.multipartBodyParser())
        server.listen(config.port, () => console.log(`Restify listening on ${config.host}:${config.port}`))
        return server
    }
}
