const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
// const socketEvents = require('./socketevents')(io);
const path = require('path');

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

const port = process.env.PORT || 3090;
server.listen(port);
console.log('Server listening on port:', port);

// Start queue polling ---------------------------------------------------------
// When two players are selected the given callback will be fired
var PlayerQueue = require('./core/player_queue');
var Game = require('./core/game');
const BOARD_SIZE = 3; // change this to change board size

var playerQueue = new PlayerQueue();
var currentGames = [];
playerQueue.startPolling(2000, function(player1, player2) {
  var newGame = new Game(player1, player2, BOARD_SIZE);
  currentGames.push(newGame);

  // Let players know that they're in a game
  // Send:
  const data = {
    player1: newGame.player1,
    player2: newGame.player2,
    whoseTurn: newGame.whoseTurn,
    boardLayout: newGame.board.squares
  };

  io.to(player1.id).to(player2.id).emit('game created', data);
  console.log(currentGames);
});

// Socket events ---------------------------------------------------------------
io.on('connection', function(socket) {
  console.log('Client connected with ID:', socket.id);

  socket.on('disconnect', function() {
    console.log('Client disconnected with ID:', socket.id);
    // kick player out of queue / game
  });

  socket.on('join queue', function(data) {
    if (data) {
      const player = {
        id: socket.id,
        name: data.name
      };
      playerQueue.addPlayer(player);
      console.log('Player joined queue', socket.id);
    }

    console.log('Player queue:', playerQueue.queue);
  });
});
