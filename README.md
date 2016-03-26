Tic Tac Toe

Stack:
Frontend
React components
Redux
Socket.io
Styles (SASS?)
Webpack
Mocha / Chai / JQuery tests
Like in Stephen Grider’s tutorial

Backend:
Node
Express
Serve front end bundle on root
Socket.io
Web workers?
To support concurrent games, but perhaps this will work anyway?
JS core logic
should add connections to a queue and select first two from queue to form a game
Table should be formed with two players
When player A makes a move, add move to board, emit to player B & vice-versa
Build this first
Mocha / Chai tests

Front end components:
Board
Tile

Actions:
Make move
Set name?
Disconnect
