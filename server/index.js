const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const socketEvents = require('./socketevents')(io);
const path = require('path');

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

const port = process.env.PORT || 3090;
server.listen(port);
console.log('Server listening on port:', port);

// Start queue polling
// When two players are selected the given callback will be fired
var PlayerQueue = require('./core/player_queue');
var Game = require('./core/game');
const BOARD_SIZE = 3; // change this to change board size

var playerQueue = new PlayerQueue();
var currentGames = [];
playerQueue.startPolling(2000, function(player1, player2) {
  currentGames.push(new Game(player1, player2, BOARD_SIZE));
});
