const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

// Dia kan meng-get halaman home

const { getHomePage } = require('./routes/index');
const { addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage } = require('./routes/player');

const port = 5000;

// membuat database koneksi menggunakan js

const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: '12',
    database: 'db_nodesimple'
});

// kenek ke db mysql cuk

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('====================================');
    console.log('Wis Kenek Databese');
    console.log('====================================');
});
global.db = db;

// konfigurasi middleware kek laravel okeh

app.set('port', process.env.port || port); // set express gunakake port iki
app.set('views', __dirname + '/views'); // set express kanggo ngeti folder kui sg ape dirender
app.set('view engine', 'ejs'); // konfigurasi template engine kek blade template
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parsing data form
app.use(express.static(path.join(__dirname, '/public/'))); // konfigurasi express buat akses folder public
app.use(fileUpload()); // fileupload

// routes for the app

app.get('/', getHomePage);
app.get('/add', addPlayerPage);
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
app.post('/edit/:id', editPlayer);

app.listen(port, () => {
    console.log('====================================')
    console.log('Server berjalan di port: ', port);
    console.log('====================================')
})







