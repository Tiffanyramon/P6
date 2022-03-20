const Auth = require('../models/auth');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptojs = require ('crypto-js');
const dotenv = require('dotenv');
const result  = dotenv.config();

// enregistrer nouvel utilisateur 
exports.signUp = (req, res, next) =>{
    // crypter l'email
    const emailCryptoJS = cryptojs.HmacSHA256(req.body.email, `${process.env.CRYTOJS_EMAIL}`).toString()
    //hash du mdp
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const auth = new Auth({
            email: emailCryptoJS,
            password: hash,
        });
        auth.save()
        .then(() => res.status(201).json( { message: 'utilisateur crée'}))
        .catch(error => res.status(400).json({ error}));
    })
    .catch(error => res.status(500).json ({ error }));
};


//s'identifier 
exports.login =(req, res, next) => {
    const emailCryptoJS = cryptojs.HmacSHA256(req.body.email, `${process.env.CRYTOJS_EMAIL}`).toString()
    Auth.findOne({ email: emailCryptoJS}) // email identique 
    .then(auth => {
        if (!auth) {
            return res.status(401).json({ error: 'Utilisateur non trouvé'}); // mauvais email
        }
        bcrypt.compare(req.body.password, auth.password) // comparateur de mdp 
        .then(valid => {
            if(!valid){
                return res.status(401).json({ error: 'Mot de passe incorret'}); // mauvais mdp 
            }
            // Si bon token identique et session ouverte pendant 24H 
            res.status(200).json({
                userId: auth._id, 
                token: jwt.sign(
                    { userId: auth._id},
                    process.env.JWT_SECRET, 
                    { expiresIn: '24h'}
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
     })
     .catch(error => res.status(500).json({ error }));

};
