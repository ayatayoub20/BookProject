const express = require('express')
const Router = express.Router()
const bookController =require('../controller/bookController')

Router.get('book/list',bookController.getBookList )
Router.get('book/details/:bookId', bookController.getBookdetails)
Router.post('book/save', bookController.saveBook)
Router.put('book/update', bookController.udateBook)
Router.delete('book/delete', bookController.deleteBook)


module.exports = Router;
