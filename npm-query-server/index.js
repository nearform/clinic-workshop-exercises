const mongojs = require('mongojs')
const fastify = require('fastify')
const computeMagic = require('@nearform/compute-magic')

const db = mongojs('localhost:27017/npm')
const c = db.collection('modules')
const app = fastify()

// get 5 newest and 5 oldest, no index
app.get('/', function (req, reply) {
  c.find().sort({modified: -1}).limit(5, function (err, newest) {
    if (err) return reply.code(500).send(err)
    c.find().sort({modified: 1}).limit(5, function (err, oldest) {
      if (err) return reply.code(500).send(err)
      const magic = computeMagic(newest, oldest)
      reply.send({
        magic,
        newest,
        oldest
      })
    })
  })
})

app.listen(3000)
