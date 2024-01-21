const Sequelize = require('sequelize')
const sequelize = require('../util/database')
const Mail = sequelize.define('Mail',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    text:{
        type:Sequelize.STRING,
    },
    sender:{
        type:Sequelize.STRING,
        allowNull:false
    },
    receiver:{
        type:Sequelize.STRING,
        allowNull:false
    },
    unread:{
        type:Sequelize.BOOLEAN
    }
})

module.exports = Mail