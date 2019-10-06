const websocket = require('ws')
const express = require('express')
const http = require('http')
const app = express()

process.env.HOST = '0.0.0.0'
process.env.PORT = 8080

app.get('/ping', (req, res) => {
    res.status(200).send('pong')
})

app.get('/', (req, res) => {
    res.status(200).send('hello')
})

const clients = new Set()
const server = http.createServer(app)
const wss = new websocket.Server({ noServer: true })

server.on('upgrade', (req, socket, headers) => {
    wss.handleUpgrade(req, socket, headers, ws => {
        wss.emit('connection', ws, req)
    })
})

wss.on('connection', (ws, req) => {
    let ip = req.connection.remoteAddress
    let port = req.connection.remotePort
    ws.remoteAddr = `${ip}:${port}`
    ws.key = req.headers['sec-websocket-key']
    echo(ws.remoteAddr, 'connected')
    
    clients.add(ws)    
    ws.on('message', handlerMessage)
    ws.on('close', handlerDisconnect)
    ws.on('error', handlerError)
})

server.listen(process.env.PORT, process.env.HOST, _ => {
    console.log(`${new Date().toLocaleString()} Server is listening on ${process.env.HOST}:${process.env.PORT}`)
})

function echo(addr, message) {
    console.log(`${new Date().toLocaleString()} [${addr}] ${message}`)
}

function handlerMessage(data) {
    echo(this.remoteAddr, `received: ${data}`)
    for (let client of clients) {
        if (client.key === this.key) { //Todo: 需要改进查找算法
            client.send(data)
        }
    }
}

function handlerDisconnect(code, reason) {
    echo(this.remoteAddr, 'disconnected')
    clients.delete(this)
}

function handlerError(err) {
    echo(this.remoteAddr, `error: ${err}`)
    clients.delete(this)
}

