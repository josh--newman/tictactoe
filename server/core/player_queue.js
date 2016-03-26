// A list of players which is polled every n seconds to form games
// A player looks like:
//    player = {
//      id: '/#JuD2NocDEVP2V1RzAAAb', (socket ID)
//      name: 'Josh',
//    }

function PlayerQueue() {
  this.queue = [];
}

PlayerQueue.prototype.addPlayer = function(player) {
  this.queue.push(player);
};

PlayerQueue.prototype.startPolling = function(time, callback) {
  var queue = this.queue;
  setInterval(function () {
    console.log('polling the queue');
    console.log(this);
    // Stop here if not two players
    if (queue.length < 2) { return; }

    // Grab the first two players and throw them into a game
    callback(player1, player2);

  }, time);
};

module.exports = PlayerQueue;
