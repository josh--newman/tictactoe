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
    // Stop here if not two players
    if (queue.length < 2) { return; }

    // Grab two random players and throw them into the callback
    var index = Math.floor(Math.random() * queue.length);
    const player1 = queue[index];
    queue.splice(index, 1);

    index = Math.floor(Math.random() * queue.length);
    const player2 = queue[index];
    queue.splice(index, 1);

    callback(player1, player2);

  }, time);
};

module.exports = PlayerQueue;
