const express = require('express')
const mongoose = require('mongoose')
const app = express()

const Person = require('./models/Person')

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// API Routes
app.post('/person', async (req, res) => { 
    
    // req.body
    const {name, salary, approved} = req.body

    const person = {
        name,
        salary,
        approved
    }

    try {
        await Person.create(person)
        
        res.status(201).json({message: 'Pessoa inserida no sistema com sucesso! '})

    } catch (error) {
        res.status(500).json({error: error})
    }

})

//Initial Route
app.get('/', (req, res) => {
    res.json({ message: 'Hello Express! '})
})

// entregar uma porta
const DB_USER = 'lucaslamin'
const DB_PASSWORD = encodeURIComponent('Luc@Bru152829')

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.lw6auhy.mongodb.net/bancodaapi?retryWrites=true&w=majority`,
  )
  .then(() => {
    console.log('Conectou ao banco!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))

  