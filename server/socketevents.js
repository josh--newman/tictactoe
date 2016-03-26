exports = module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('Client connected with ID:', socket.id);

    socket.on('disconnect', function() {
      console.log('Client disconnected with ID:', socket.id);
      // kick player out of game
    });

    socket.on('join queue', function(data) {
      console.log('Player joined queue', socket.id, data.name);
      socket.emit('join queue', "Joined");
    });
  });
};
