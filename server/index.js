const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');

const PORT = 8080;
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL }));
const server = createServer(app);                                   // convert: express server --> http server
const io = new Server(server, { cors: process.env.CLIENT_URL });    // convert: http server    --> socket server

// listens to socket events
io.on('connection', () => {
  console.log('socket server connected.');
});

// run: http server
server.listen(PORT, () => {
  console.log('server running at http://localhost:8080');
});