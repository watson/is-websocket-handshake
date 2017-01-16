'use strict'

module.exports = function (req) {
  if (req.method !== 'GET') return false
  var upgrade = req.headers['upgrade']
  var connection = req.headers['connection']
  if (!upgrade || !connection) return
  upgrade = upgrade.toLowerCase()
  connection = connection.toLowerCase()
  return upgrade === 'websocket' && connection === 'upgrade'
}
