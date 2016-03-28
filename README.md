![tictactoe](http://i.imgur.com/6gP9Nfc.png)

# Tic Tac Toe
This is an implementation of Tic Tac Toe in a multiplayer fashion using a central server and socket connections.

When a player starts a game they're added to a queue. The server will poll the queue every N seconds and randomly select two players to form a game.

Players communicate moves between each other through their respective socket connects to the server.

## Stack
### Front end
- React (ES6)
- Socket.io
- SASS
- Webpack

#### Directory structure
```
client
├── src
│   └── components
│       ├── App.js
│       ├── Board.js
│       ├── Menu.js
│       ├── Status.js
│       └── Tile.js
├── styles
│   └── main.scss
├── test
│   ├── components
│   │   ├── App_test.js
│   │   └── Menu_test.js
│   └── test_helper.js
└── index.js
```

The front end is composed of React components. App state and socket listeners are handled in the `App.js` component.

### Backend
- Node
- Express
- Socket.io
- Mocha / Chai testing

#### Directory structure
```
server
├── core
│   ├── board.js
│   ├── game.js
│   └── player_queue.js
├── test
│   ├── board_test.js
│   ├── game_test.js
│   ├── player_queue_test.js
│   └── socket_test.js
├── index.js
└── main.js
```

The core logic of the game is in `board.js` and `game.js`. The game supports an NxN board, though a 3x3 board is hardcoded at present.

All logic for the game lives on the server. This prevents a player from maliciously manipulating the game to their advantage.

The game assumes 2 human players (no AI).

### Setup
```
$ npm install
$ npm run dev
```

### Test
```
$ npm run test
```


### What to do better
- Write thorough front end tests
- ES6 server side
- Redux for front end state
