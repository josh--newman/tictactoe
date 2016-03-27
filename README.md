# Tic Tac Toe
This is an attempt to implement Tic Tac Toe in a multiplayer fashion using a central server and socket connections.

## Stack
### Front end
- React
- Redux
- Socket.io
- Styles (SASS?)
- Webpack
- Mocha / Chai testing

### Redux state
```js
{
  currentlyPlaying: false,
  gameId: 123456789,
  board: [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ],
  player1: { name: 'Josh', symbol: 'X' },
  player2: { name: 'Bill', symbol: 'O' },
  myTurn: false,
  winner: null
}
```

### Redux action types
```
START_GAME          // from UI
GAME_STARTED        // from server
PLAYER_DISCONNECTED // from server
MAKE_MOVE           // from UI
RECEIVE_MOVE        // from server
```

### Backend
- Node
- Express
- Socket.io
- Mocha / Chai testing
