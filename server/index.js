const express = require('express')
const app = express()
const websocket = require('ws')
const websocketServer = websocket.Server

process.env.HOST = '0.0.0.0'
process.env.PORT = 8080

const server = new websocketServer({ noServer: true })
const clients = new Set()

app.get('/ping', (req, res) => {
    res.status(200).send('pong')
})

app.get('/', (req, res) => {
    if (req.headers.connection == 'upgrade' && req.headers.upgrade == 'websocket') {
        server.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
            ws.ip = req.connection.remoteAddress
            ws.port = req.connection.remotePort
            ws.remoteAddr = `${ws.ip}:${ws.port}`
            
            echo(ws.remoteAddr, 'connected')
            clients.add(ws)

            ws.on('message', handlerMessage)
            ws.on('close', handlerDisconnect)
            ws.on('error', err => {
                echo(ws.remoteAddr, `error: ${err}`)
            })
        })
    } else {
        res.status(200).send('hello')
    }
})

app.listen(process.env.PORT, process.env.HOST, _ => {
    console.log(`${new Date().toLocaleString()} Server is listening on ${process.env.HOST}:${process.env.PORT}`)
})

function echo(addr, message) {
    console.log(`${new Date().toLocaleString()} [${addr}] ${message}`)
}

function handlerMessage(data) {
    echo(this.remoteAddr, `received: ${data}`)
    for (let client of clients) {
        client.send(data)
    }
}

function handlerDisconnect(code, reason) {
    echo(this.remoteAddr, 'disconnected')
    clients.delete(this)
}

