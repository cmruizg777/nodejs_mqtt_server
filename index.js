const aedes = require('aedes')()
const server = require('net').createServer(aedes.handle)
const port = 1883
const wsPort = 8883

server.listen(port, function () {
  console.log('Servidor iniciado y escuchando en el puerto ', port)
})


aedes.on('client', (client)=>{
    console.log('Un cliente está conectandose ...')
})

aedes.on('clientReady', (client)=>{
    console.log('Un cliente se ha conectado')
    console.log(client.id)
})
aedes.on('publish', function (packet, client) {
    if (client) {
        console.log('message from client', client.id)
        console.log(`MQTT Client Message.  Topic: ${packet.topic}.  Message: ${packet.payload.toString('utf-8')}`);
    }
})

const httpServer = require('http').createServer()
const ws = require('websocket-stream')
ws.createServer({ server: httpServer }, aedes.handle)

httpServer.listen(wsPort, function () {
    
});

function sendMessage(){
    // do whatever you like here
    aedes.publish({ topic: 'events/move', payload: "I'm broker " + aedes.id }, error => {})
    setTimeout(sendMessage, 400);
}

sendMessage();
