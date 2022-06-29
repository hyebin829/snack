const express = require('express')
const db = require('./models')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

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
    origin: 'http://localhost:3001',
    credentials: true, //다른 도메인에 쿠키를 전달할 수 있다.
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('server')
})

app.listen(3065, () => {
  console.log('hello')
})
