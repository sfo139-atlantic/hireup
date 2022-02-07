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
// app.get('/profiles/:id', controllers.profiles.getById);

app.get('/profiles', controllers.profiles.get);
app.get('/profiles/findOne', controllers.profiles.getOne);
app.post('/create',controllers.profiles.post);
app.put('/update',controllers.profiles.put);
app.put('/delete', controllers.profiles.delete);

app.put('/proposal/delete/:userId/:id', controllers.profiles.deleteProposal)
app.post('/proposal', controllers.profiles.createProposal)
app.patch('/proposal', controllers.profiles.updateProposal)
app.patch('/skill', controllers.profiles.updateSkill)


//Get messages and message info
app.get('/message', controllers.messages.getOne);
app.get('/messages', controllers.messages.getAll);
app.post('/message', controllers.messages.create)

//WEBSOCKET
const io = require('socket.io')(3002, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
let connections = {};

io.on('connection', socket => {
  const db = require('./models/mongo.js');
  socket.emit('connect-verify', 'Websocket Connection Created');

  socket.on('handshake', data => {
    connections[data] = socket.id;
  });
  socket.on('send-chat-message', message => {
    const parsedMessage = {user: message.sendFrom, time: Date.now(), message: message.message}
    db.messages.updateOne({
      users: {
        $all: [message.sendTo, message.sendFrom]
      }
    }, {
      $push: {
        messages: parsedMessage
      }}).catch((e)=>console.log(e))
    socket.emit('chat-message', parsedMessage);
    socket.to(connections[parseInt(message.sendTo)]).emit('chat-message', parsedMessage);
  })

});
