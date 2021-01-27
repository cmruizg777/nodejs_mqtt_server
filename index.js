const aedes = require('aedes')()
const server = require('net').createServer(aedes.handle)
const port = 1883
const wsPort = 8883
const nodemailer = require('nodemailer');
const { send } = require('process');
/*
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ruiz.cristian24111993@gmail.com',
      pass: 'xxxx4444'
    }
  });
  
const mailOptions = {
    from: 'ruiz.cristian24111993@gmail.com',
    to: 'cmruizg1993@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });*/
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
        if (packet.topic=='Principal'){
          const info = JSON.parse(packet.payload.toString('utf-8'));
          sendMessage(info);
        }
    }
})
const httpServer = require('http').createServer()
const ws = require('websocket-stream')
ws.createServer({ server: httpServer }, aedes.handle)

httpServer.listen(wsPort, function () {});

function sendMessage(info){
    console.log('enviando datos ...')
    aedes.publish({ topic: 'events/move', payload: JSON.stringify(info) }, error => {})
}

