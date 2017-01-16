# is-websocket-handshake

Check if a request is a WebSocket handshake request.

[![Build status](https://travis-ci.org/watson/is-websocket-handshake.svg?branch=master)](https://travis-ci.org/watson/is-websocket-handshake)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![sponsor](https://img.shields.io/badge/sponsored%20by-Opbeat-3360A3.svg)](https://opbeat.com)

Example WebSocket handshake:

```http
GET /chat HTTP/1.1
Host: example.com:8000
Upgrade: websocket
Connection: Upgrade
```

## Installation

```
npm install is-websocket-handshake --save
```

## Usage

```js
var http = require('http')
var isWebSocketHandshake = require('is-websocket-handshake')

var server = http.createServer(function (req, res) {
  console.log('received regular http request')
})

server.on('upgrade', function (req, socket, head) {
  if (isWebSocketHandshake(req)) {
    console.log('received proper WebSocket handshake')
  }
})

http.listen(3000)
```

## API

### `isWebSocketHandshake(request)`

Accepts an instance of a [`http.IncomingMessage`
object](https://nodejs.org/api/http.html#http_class_http_incomingmessage)
as the first argument.

Returns a boolean.

## Acknowledgements

This project was kindly sponsored by [Opbeat](https://opbeat.com).

## License

MIT
