const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { recipes } = require('./routes')
const { users } = require('./routes')
const { sessions } = require('./routes')
const passport = require('./config/auth')

const port = process.env.PORT || 3030

let app = express()

app
  .use(cors())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(passport.initialize())

  // Our recipes routes
  .use(recipes)
  .use(users)
  .use(sessions)



  // catch 404 and forward to error handler
  .use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  // final error handler
  .use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
      message: err.message,
      error: app.get('env') === 'development' ? err : {}
    })
  })

  .listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  })
