'use strict'

var http = require('http')
var semver = require('semver')
var test = require('tape')
var isWebSocketHandshake = require('./')
var pre4 = semver.lt(process.version, '4.0.0')

test('Proper WebScoket handshake', function (t) {
  var server = http.createServer(function (req, res) {
    t.fail('should not emit request event')
  })

  server.on('upgrade', function (req, socket, head) {
    t.equal(isWebSocketHandshake(req), true)
    socket.end()
    server.close()
    t.end()
  })

  server.listen(function () {
    var opts = {
      port: server.address().port,
      method: 'GET',
      headers: {
        Upgrade: 'websocket',
        Connection: 'upgrade'
      }
    }
    var req = http.request(opts)
    req.on('error', function () {})
    req.end()
  })
})

test('Non-handshake - GET request', function (t) {
  var server
  if (pre4) {
    // handle bad behavior in node 0.10 and 0.12
    server = http.createServer(function (req, res) {
      t.fail('should not emit request event')
    })

    server.on('upgrade', function (req, socket, head) {
      t.equal(isWebSocketHandshake(req), false)
      socket.end()
      server.close()
      t.end()
    })
  } else {
    server = http.createServer(function (req, res) {
      t.equal(isWebSocketHandshake(req), false)
      res.end()
      server.close()
      t.end()
    })

    server.on('upgrade', function (req, socket, head) {
      t.fail('should not emit upgrade event')
    })
  }

  server.listen(function () {
    var opts = {
      port: server.address().port,
      method: 'GET',
      headers: {
        Upgrade: 'websocket' // missing Connection header
      }
    }
    var req = http.request(opts)
    req.on('error', function () {})
    req.end()
  })
})

test('Non-handshake - POST request', function (t) {
  var server = http.createServer(function (req, res) {
    t.fail('should not emit request event')
  })

  server.on('upgrade', function (req, socket, head) {
    t.equal(isWebSocketHandshake(req), false)
    socket.end()
    server.close()
    t.end()
  })

  server.listen(function () {
    var opts = {
      port: server.address().port,
      method: 'POST',
      headers: {
        Upgrade: 'websocket',
        Connection: 'upgrade'
      }
    }
    var req = http.request(opts)
    req.on('error', function () {})
    req.end()
  })
})
