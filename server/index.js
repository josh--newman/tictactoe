const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

const port = process.env.PORT || 3090;
server.listen(port);
console.log('Server listening on port:', port);

// Load main logic
const main = require('./main')(io);
