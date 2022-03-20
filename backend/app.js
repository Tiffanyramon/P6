require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require ('cors');
const helmet = require('helmet');
const app = express();
const rateLimit = require ('express-rate-limit');

const sauceRoute = require('./routes/sauce');
const authRoute = require('./routes/auth');

//connexion à mongoose
mongoose.connect(process.env.MONGO_URL)
 .then(() => console.log('Connexion à MongoBD réussi'))
 .catch(() => console.log('connexion à MongoDB échoué'))

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use((req, res, next) => {
    //acceder a l'api
    res.setHeader('Access-Control-Allow-Origin', '*')
    //requetes
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    //methode
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTION')
    next()
});

//limite d'entrées
const apiLimier = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limites de 100 requêtes
    standardHeaders: true,
    legacyHeaders: false,
})

app.use('/api' , apiLimier);

app.use(cors());

app.use(helmet());

app.use(express.json());



app.use ('/api/sauces', sauceRoute);
app.use ('/api/auth', authRoute);

module.exports = app