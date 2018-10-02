const express = require('express')
const bodyParser = require('body-parser')
const articles = require('./articles')
const cors = require('cors')

const app = express()

// Port to run the server
var port = process.env.PORT || 3001

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
// parse requests of content-type json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({"message": "Welcome to my demo Api"})
})

//get all articles
app.get('/articles', (req, res) => {
  articles.getAll()
    .then(
      (data) => res.send(data),
      (err) => {
        console.log(err)
        res.status(500).send({
          error: 'There was an error getting articles'
        })
      }
    )
})


// add new article
app.post('/articles', (req, res) => {
  articles.add(req.body)
    .then(
      (data) => res.send(data),
      (err) => {
        console.log(err)
        res.status.send({
          error: 'Error adding article.'
        })
      }
    )
})

// vote on article
app.post('/articles/:id', (req, res) => {
  const id = req.params.id
  articles.vote(id)
    .then(
      (data) => res.send(data),
      (err) => res.status(500).send({
        error: 'error voting on article'
      })
    )
})

// listen for requests
app.listen(port, () => {
    console.log("Server is listening on port: " + port)
})
