const express = require('express')
const Router = express.Router()
const storeController =require('../controller/storeController')

Router.get('/all', storeController.getStoreList)
Router.post('/save', storeController.saveStore)
// Router.put('/update', storeController.updateNotes)
// Router.delete('/delete/:noteId', storeController.deleteNotes)



module.exports = Router;
