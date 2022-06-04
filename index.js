require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// Rotas da API
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)


//Initial Route
app.get('/', (req, res) => {
    res.json({ message: 'Hello Express! '})
})

// entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.lw6auhy.mongodb.net/bancodaapi?retryWrites=true&w=majority`,
  )
  .then(() => {
    console.log('Conectou ao banco!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))

  