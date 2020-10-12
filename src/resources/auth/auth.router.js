const router = require('express').Router();
const auth = require('./auth.controller');

router.post('/login', auth.logIn);

module.exports = router;
