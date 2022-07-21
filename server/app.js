const express = require('express')
const db = require('./models')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const postRouter = require('./routes/post')

dotenv.config()
const app = express()

db.sequelize
  .sync()
  .then(() => {
    console.log('db연결')
  })
  .catch(console.error)

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true, //다른 도메인에 쿠키를 전달할 수 있다.
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
)

app.get('/', (req, res) => {
  res.send('server')
})

app.use('/post', postRouter)

app.listen(3065, () => {
  console.log('hello')
})
