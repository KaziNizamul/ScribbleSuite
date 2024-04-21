const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL }));
const httpServer = createServer(app);                                   // convert: express server --> http server
const io = new Server(httpServer, { cors: process.env.CLIENT_URL });    // convert: http server    --> socket server


// listens to socket events
io.on('connection', (socket) => {
  console.log('socket server connected.')

  socket.on('beginDraw', (args) => {
    socket.broadcast.emit('beginDraw', args)
  })

  socket.on('endDraw', (args) => {
    socket.broadcast.emit('endDraw', args);
  })

  socket.on('changeConfig', (arg) => {
    socket.broadcast.emit('changeConfig', arg)
  })
});

// run: http server
httpServer.listen(8080);