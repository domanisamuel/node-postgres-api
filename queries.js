const Pool = require('pg').Pool
const pool = new Pool({
    user: '',
    password: '',
    database: 'silicon-valley',
    host: 'localhost',
    port: 5432
})

// creating users table
function createUsersTable () {
    pool.query('CREATE TABLE IF NOT EXISTS users (user_id serial PRIMARY KEY, firstname VARCHAR (50) UNIQUE NOT NULL,lastname VARCHAR (50) UNIQUE NOT NULL, email VARCHAR (355) UNIQUE NOT NULL, phone VARCHAR (15) UNIQUE NOT NULL)')
}
createUsersTable()

// get all users
const getUsers = (req, res) => {
    pool.query('SELECT * FROM users ORDER BY user_id ASC', (error, results) => {
        if (error) {
            // throw error
            console.log(error)
        }
        res.status(200).json({
            status: 'success',
            message: 'Retrieved ALL users',
            data: results.rows
        })
    })
}
// get user by id
const getUserById = (req, res) => {
    const userId = parseInt(req.params.id)

    pool.query('SELECT * FROM users WHERE user_id = $1', [userId], (error, results) => {
        if (error) {
            // throw error
            console.log(error)
        }
        res.status(200).json({
            status: 'success',
            message: `Retrieved ONE user with ID: ${userId}`,
            data: results.rows
        })
    })
}
// post a user
const createUser = (req, res) => {
    // generate random id
    function getRandomNumber (max) { return Math.floor(Math.random() * Math.floor(max))}
    const identity = getRandomNumber(1000000)

    const { firstname, lastname, email, phone } = req.body
    pool.query('INSERT INTO users (user_id, firstname, lastname, email, phone) VALUES ($1, $2, $3, $4, $5)', [identity, firstname, lastname, email, phone ], (error, results) => {
        if (error) {
            // throw error
            console.log(error)
        }
        res.status(201).json({
            status: 'success',
            message: `Inserted a user with ID: ${identity}`,
        })
    })
}
// update a user
const updateUser = (req, res) => {
    const id = parseInt(req.params.id)
    const { firstname, lastname, email, phone } = req.body

    pool.query(
        'UPDATE users SET firstname = $1, lastname = $2, email = $3, phone = $4 WHERE user_id = $5',
        [firstname, lastname, email, phone, id],
        (error, results) => {
            if (error) {
                // throw error
                console.log(error)
            }
            res.status(200).json({
                status: 'success',
                message: `MODIFIED a user with ID: ${id}`,
            })
        }
    )
}
// delete user
const deleteUser = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM users WHERE user_id = $1', [id], (error, results) => {
        if (error) {
            // throw error
            console.log(error)
        }
        res.status(200).json({
            status: 'success',
            message: `DELETED a user with ID: ${id}`,
            data: results.rows
        })
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}