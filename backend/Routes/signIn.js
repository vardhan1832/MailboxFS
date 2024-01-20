const express = require('express')
const signincontroller = require('../Controller/signIn')
const router = express.Router()

router.post('/sign-in',signincontroller)

module.exports = router