const express = require('express')
const router = express.Router()
const mailController= require('../Controller/mail')
const userauth = require('../auth/authentication')

router.post('/mailbox',userauth,mailController.postMail)
router.post('/mailbox/:id',userauth,mailController.putMail)
router.get('/inbox',userauth,mailController.getInbox)
router.get('/sent',userauth,mailController.getSent)
router.delete('/mailbox/:id',userauth,mailController.deleteMail)

module.exports = router