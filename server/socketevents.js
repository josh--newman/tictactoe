exports = module.exports = function(io) {
  io.on('connection', function(client) {
    console.log('Client connected with ID:', client.id);
  });
};
