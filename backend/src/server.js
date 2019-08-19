const restify = require('restify')
const corsMiddleware = require('restify-cors-middleware')

module.exports = {
    create: config => {
        const server = restify.createServer();

        const cors = corsMiddleware({
            preflightMaxAge: 5,
            origins: ['*'],
            allowHeaders:['X-App-Version'],
            exposeHeaders:[]
        })

        server.use(cors.actual)
        server.pre(cors.preflight)
        server.use(restify.plugins.bodyParser())
        server.use(restify.plugins.queryParser())
        server.listen(config.port, () => console.log(`Restify listening on ${config.host}:${config.port}`))
        return server
    }
}
