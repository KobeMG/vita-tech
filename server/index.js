const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());



app.get('/', (req, res) => {
    db.query(`SELECT * FROM mydb.user;`, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});


const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'Kobe7247',
    database: 'mydb',
});

app.use(cors({
    origin: 'http://localhost:4000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));





mysql.createConnection();
app.post('/purchase', (req, res) => {
    const name = req.body.name;
    const lastName = req.body.lastName;
    const direction = req.body.direction;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;

    db.query(`INSERT INTO order (name, lastName, direction, phoneNumber, email) VALUES (?,?,?,?,?)`,
        [name, lastName, direction, phoneNumber, email], (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        }
    );
});



app.post('/post-purchase', (req, res) => {
    const id = req.body.id;
    db.query(`SELECT * FROM user WHERE id = ?`, [id], (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});








app.listen(4000, () => {
    console.log('Server is running on port 4000');
});