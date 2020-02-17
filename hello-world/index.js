const http = require('http')

http.createServer(function (req, res) {
  res.end('Hello, World!\n')
}).listen(3000)

