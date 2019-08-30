const express = require('express') // create instance of express app
const app = express() // initialize the app / create instance of express app
const port = process.env.port || 3000 // define port
const path = require('path') // get path for routing
const bodyParser = require('body-parser')
const db = require('./queries')


//view engine (css images and static files)
app.set('/views', path.join(__dirname, 'views'))
app.use(express.static('views'))
app.use('/static', express.static('static'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true,}))

//default home route
app.get('/', (req, res) => res.send('Welcome to ExpressPostgres api Data'));

//get routes
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

// Start a TCP server listening for connections on the given port and host
app.listen(port, () => {
    console.log(`ExpressPostgres api running on port ${port}`)
})