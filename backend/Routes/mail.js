const express = require('express')
const router = express.Router()
const mailController= require('../Controller/mail')
const userauth = require('../auth/authentication')
router.post('/mailbox',userauth,mailController.postMail)
router.get('/inbox',userauth,mailController.getInbox)

module.exports = router