const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./util/database')
var cors = require('cors')

const app = express();
app.use(cors())


const signInRoutes = require('./Routes/signIn')
const loginRoutes =  require('./Routes/login')
const mailRoutes = require('./Routes/mail')

app.use(bodyParser.json({extended:false}))
app.use(signInRoutes)
app.use(loginRoutes)
app.use(mailRoutes)

sequelize.sync()
    .then(res=>{
        app.listen(5000,console.log('app started'))
    })
    .catch(err=>{
        console.log(err)
    })