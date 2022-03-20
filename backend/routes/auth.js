const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');
const password = require('../middleware/password');
//route pour crée un compte
router.post('/signup', password, authCtrl.signUp);
//route pour s'identifier
router.post('/login', authCtrl.login);


module.exports = router;