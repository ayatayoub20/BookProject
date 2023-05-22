const express = require('express')
const noteRoute = express.Router()
const noteController =require('../controller/noteController')

noteRoute.get('/all', noteController.getlAllNotes)
noteRoute.post('/save', noteController.saveNotes)
noteRoute.put('/update', noteController.updateNotes)
noteRoute.delete('/delete/:noteId', noteController.deleteNotes)



module.exports = noteRoute;
