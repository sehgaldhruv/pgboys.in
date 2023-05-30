const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const { mongoConnect } = require('./database/database');
const app = express();
const PORT = 4444;
const hbs = require('hbs');
const postRouter = require('./routes/pg');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/pgForBoys', postRouter);

mongoose.connect('mongodb://127.0.0.1:27017/')
    .then(() => {
        app.listen(PORT, () => {
            console.log(`http://localhost:` + PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    })