const express = require('express');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const cors = require('cors');
const app = express();
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'nodeJS',
        password : 'M0n&',
        database : 'smart-brain'
    }
});
app.use(express.json());
app.use(cors());
app.post('/signin', signin.handleSignIn(db, bcrypt));
app.post('/register', (req,res) => {register.handleRegister(req, res, db, bcrypt, saltRounds)});
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});
app.post('/imageurl', (req,res) => {image.handleApiCall(req, res)})
app.put('/image', (req,res) => {image.handleImage(req, res, db)});
app.listen(3000, ()=> {
    console.log('App is running on port 3000');
});