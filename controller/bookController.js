var model = require('../Model/storeModel');
var queries = require('../db/queries');
var dbConnection = require('../db/connection');
var util = require('../util/utilty');
var logger = require('../services/loggerService');
var auditService = require('../audit/audit');
var Action = require('../audit/auditAction');
var APIError = require('../error/api.error');
var errorStatus = require('../error/error.status');
var errorType = require('../error/error.type')

const log = new logger('book.controller');   //parametr = path 

exports.getBookList = async (req, res) => {
   try {
      var bookListQuery = queries.queryList.GET_BOOK_LIST;
      var result = await dbConnection.dbQuery(bookListQuery);
      log.info("return list books ", result.rows);
      auditService.prepareAudit(Action.auditAction.GET_BOOK, result.rows, null, "admin", util.dataFormat)
      return res.status(200).send(JSON.stringify(result.rows));
   } catch (err) {
      console.log('error :' + err)
      return res.status(500).send({ error: 'Failed to list book ' });
   }
}

exports.getBookdetails = async (req, res) => {
   try {
      var bookId = req.params.bookId;
      console.log("bookId : " + bookId);
      if (isNaN(bookId))
         throw new APIError(errorType.API_ERROR , 
         errorStatus.INTERNAL_SERVER_ERROR ,
          "Invalid bookId , is not a number , bookId value is : " + bookId , 
          true);

      var bookDetailsQuery = queries.queryList.GET_BOOK_DETAILS;
      var result = await dbConnection.dbQuery(bookDetailsQuery, [bookId]);

      return res.status(200).send(JSON.stringify(result.rows));
   } catch (err) {
      console.log('error :' + err)
      return res.status(500).send({ error: 'Failed to book details  ' });
   }
}

exports.saveBook = async (req, res) => {
   try {
      var createdBy = "ayat";
      var createnOn = new Date();
      //req body
      var title = req.body.title;
      var description = req.body.description;
      var author = req.body.author;
      var publisher = req.body.publisher;
      var pages = req.body.pages;
      var storeCode = req.body.storeCode;


      if (!title || !storeCode || !author || !publisher) {
         return res.status(500).send({ error: 'title and storeCode and author and publisher should not be empty' })
      }

      storeCode = util.generateStoreCode();

      values = [title, description, author, publisher, pages, storeCode, createdBy, createnOn]
      var saveBookQuery = queries.queryList.SAVA_BIIK_QUERY;
      await dbConnection.dbQuery(saveBookQuery, values);

      return res.status(201).send(' Successfuly adding new book');
   } catch (error) {
      console.log('error :' + err)
      return res.status(500).send({ error: 'Failed to add new book' });
   }

}


exports.udateBook = async (req, res) => {
   try {
      var createdBy = "ayat";
      var createnOn = new Date();
      //req body
      var bookId = req.body.bookId;
      var title = req.body.title;
      var description = req.body.description;
      var author = req.body.author;
      var publisher = req.body.publisher;
      var pages = req.body.pages;
      var storeCode = req.body.storeCode;


      if (!bookId || !title || !storeCode || !author || !publisher) {
         return res.status(500).send({ error: 'bookId and title and storeCode and author and publisher should not be empty' })
      }

      values = [title, description, author, publisher, pages, storeCode, createdBy, createnOn]

      var updateBookQuery = queries.queryList.UPDATE_BIIK_QUERY;
      await dbConnection.dbQuery(updateBookQuery, values);

      return res.status(201).send(' Successfuly update book title : ' + title);
   } catch (error) {
      console.log('error :' + err)
      return res.status(500).send({ error: 'Failed to update book title' + title });
   }

}


exports.deleteBook = async (req, res) => {
   var bookId = req.params.bookId;
   try {
      if (!bookId) {
         return res.status(500).send({ error: 'can not delete empty bookId' })
      }

      var deleteBookQuery = queries.queryList.DELETE_BIIK_QUERY;
      await dbConnection.dbQuery(deleteBookQuery, [bookId]);
      return res.status(200).send(' Successfuly book deleted');
   } catch (error) {
      console.log('error :' + err)
      return res.status(500).send({ error: 'Failed to delete book id' + bookId });
   }

}