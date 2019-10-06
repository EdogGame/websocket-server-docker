const websocket = require('ws')

const ws = new websocket('ws://127.0.0.1:8080')

ws.on('open', () => {
    ws.send('hello')
})

ws.on('message', data => {
    console.log(data)
})

