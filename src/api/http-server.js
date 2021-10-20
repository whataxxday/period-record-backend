let debug = require('debug')('pinghu-website:server')
let http = require('http')

let server

function onError (error) {
    if (error.syscall !== 'listen') {
        throw error
    }

    let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(bind + ' is already in use')
            process.exit(1)
            break
        default:
            throw error
    }
}

function onListening () {
    let addr = server.address()
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port
    debug('Listening on ' + bind)
}

export const http_server = {
    start: (app) => {
        server = http.createServer(app)
        server.listen(app.get('port'))
        server.on('error', onError)
        server.on('listening', onListening)
    },
}


