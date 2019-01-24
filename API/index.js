const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
require('dotenv').config();

const port = process.env.PORT || 4001;

http.listen(port, () => {
  console.log(`listening on port ${port}`);
});

io.on('connection', socket => {
  console.log('User connected')

  const tmi = require('tmi.js');

  const options = {
    options: {
      debug: true,
    },
    connection: {
      cluster: 'aws',
      reconnect: true,
    },
    identity: {
      username: process.env.TWITCH_USERNAME,
      password: process.env.TWITCH_OAUTH,
    },
    channels: [
      'jacten',
    ],
  }

  const twitch = new tmi.client(options);

  twitch.connect();

  twitch.on('connected', (address, port) => {
    twitch.action('jacten', `Stream-Kit Connected`)
  })

  twitch.on('chat', (channel, user, message, self) => {
    if (message === '!game') {
      twitch.action('jacten', 'jacten is playing Rocket League!');
    }

    socket.emit('server.chat', { user, message })

    console.log('emit on server.chat')
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})