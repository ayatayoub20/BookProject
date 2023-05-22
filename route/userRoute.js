const express = require('express')
const Router = express.Router()
const userController =require('../controller/userController')

Router.get('/users',userController.getUserList );
Router.post('/user/save',userController.saveUser );

module.exports = Router;