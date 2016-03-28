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
var currentGames = {};
playerQueue.startPolling(2000, function(player1, player2) {
  var newGame = new Game(player1, player2, BOARD_SIZE);
  if (!currentGames[newGame.id]) {
    currentGames[newGame.id] = newGame;
  }

  // Let players know that they're in a game
  // Send:
  const data = {
    player1:     newGame.player1,
    player2:     newGame.player2,
    whoseTurn:   newGame.whoseTurn,
    boardLayout: newGame.board.squares,
    gameId:      newGame.id
  };

  io.to(player1.id).to(player2.id).emit('game created', data);
  console.log(currentGames);
});

// Socket events ---------------------------------------------------------------
io.on('connection', function(socket) {
  console.log('Client connected with ID:', socket.id);

  socket.on('disconnect', function() {
    console.log('Client disconnected with ID:', socket.id);
    // if in queue, just remove them
    if (playerQueue.removePlayer(socket.id)) {
      console.log('Removed player', socket.id);
    }
    // if in a game, emit to other player in game
    for (var game in currentGames) {
      if (currentGames.hasOwnProperty(game)) {
        var thisGame = currentGames[game];
        if (thisGame.player1.id === socket.id) {
          // emit to player 2
          io.to(thisGame.player2.id).emit('player disconnect');
          // kill game
          delete currentGames[game];
        }
        else if (thisGame.player2.id === socket.id) {
          io.to(thisGame.player1.id).emit('player disconnect');
          delete currentGames[game];
        }
        console.log(currentGames);
      }
    }
  });

  socket.on('join queue', function(data) {
    if (data) {
      const player = {
        id: socket.id,
        name: data.name
      };
      playerQueue.addPlayer(player);
      console.log('Player joined queue', socket.id);
      io.to(socket.id).emit('join success', {success: 'success'});
    }
    console.log('Player queue:', playerQueue.queue);

  });

  socket.on('make move', function(data) {
    const game = currentGames[data.gameId];
    game.move(data.player, data.coords);

    console.log('Game: ' + game.id);
    console.log(data.player.name + ' made a move');
    console.log('Board: \n' + game.board.squares);

    const moveResponse = {
      whoseTurn: game.whoseTurn,
      newLayout: game.board.squares
    };
    io.to(game.player1.id).to(game.player2.id).emit('move made', moveResponse);

    // check if game is over
    if (game.gameOver && game.winner) {
      console.log('Game ' + game.id + ' FINISHED');
      console.log('Winner: ' + game.winner.name);

      // emit to all players
      io.to(game.player1.id).to(game.player2.id).emit('game over', game.winner);
      // kill game
      delete currentGames[data.gameId];
    }
    else if (game.gameOver && !game.winner) { //draw
      console.log('Game ' + game.id + ' FINISHED');
      console.log('DRAW');
      // emit to all players
      io.to(game.player1.id).to(game.player2.id).emit('game over', game.winner);
      // kill game
      delete currentGames[data.gameId];
    }
  });
});
