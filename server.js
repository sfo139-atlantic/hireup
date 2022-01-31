const express = require('express');

const path = require('path');
const cors = require('cors');
const app = express();
const controllers = require('./controllers');
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});

//Get Profiles and Profile information
app.get('/profiles', controllers.profiles.get);
app.get('/profiles/findOne', controllers.profiles.getOne);

//Get messages and message info
app.get('/message', controllers.messages.getOne);
app.get('/messages', controllers.messages.getAll);

//WEBSOCKET EXPERIMENTATION

const io = require('socket.io')(3002, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
let connections = {};

// io.on('connection', socket => {
//   socket.emit('connect-verify', 'Websocket Connection Created');

//   socket.on('handshake', data => {
//     connections[data] = socket.id;
//     console.log(connections)
//   });
//   socket.on('send-chat-message', message => {
//     console.log(connections[message.sendTo])
//     socket.emit('chat-message', message);
//     socket.to(connections[message.sendTo]).emit('chat-message', message);
//   })

// });


io.on('connection', socket => {
  const db = require('./models/mongo.js');
  socket.emit('connect-verify', 'Websocket Connection Created');

  socket.on('handshake', data => {
    connections[data] = socket.id;
    console.log(connections)
  });
  socket.on('send-chat-message', message => {
    console.log(`Sending Message on ${socket.id}`)
    console.log(message)
    db.messages.updateOne({
      users: {
        $all: [parseInt(message.sendTo), parseInt(message.sendFrom)]
      }
    }, {
      $push: {
        messages: {user: parseInt(message.sendFrom), time: Date.now(), message: message.message}
      }}).catch((e)=>console.log(e))
    socket.emit('chat-message', message);
    socket.to(connections[parseInt(message.sendTo)]).emit('chat-message', message);
  })

});
