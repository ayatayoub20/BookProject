var model = require('../Model/storeModel');
var queries = require('../db/queries');
var dbConnection = require('../db/connection');
var util = require('../util/utilty');
var logger = require('../services/loggerService');
var auditService = require('../audit/audit');
var Action = require('../audit/auditAction');
var validationUtil = require('../util/validation');
var bcrypt = require('bcryptjs');


const log = new logger('user.controller');   //parametr = path 

exports.getUserList = async (req, res) => {
   try {
      var userListQuery = queries.queryList.GET_USER_LIST_QUERY;
      var result = await dbConnection.dbQuery(userListQuery);
      log.info("return list users ", result.rows);
      auditService.prepareAudit(Action.auditAction.GET_USER, result.rows, null, "admin", util.dataFormat)
      return res.status(200).send(JSON.stringify(result.rows));
   } catch (err) {
      console.log('error :' + err)
      return res.status(500).send({ error: 'Failed to list USER ' });
   }
}

exports.saveUser = async (req, res) => {
   try {
      var createdBy = "admin";
      var createdOn = new Date();
      // req.body
      var username = req.body.username;
      var password = req.body.password;
      var email = req.body.email;
      var fullname = req.body.fullname;
      var userTypeCode = req.body.userTypeCode;
      // list groups added to user
      var groups = req.body.groups;

      if (!username || !password || !email || !fullname || !userTypeCode ) {
         return res.status(500).send({ error: 'username , password , email , fullname , userTypeCode ,  can not empty' })
      }
      /** 
       *  Validation
       *   1- username or email not exist  
       *   2- is email 
       *   3- validate password strength 
       * */
      var isUserExistsQuery = queries.queryList.IS_USER_EXISTS_QUERY;
      var result = await dbConnection.dbQuery(isUserExistsQuery, [username, email]);
      console.log("Result : " + JSON.stringify(result))
      if (result.rows[0].count != "0") {
         return res.status(500).send({ error: 'User already Exists' })
      }

      if (!validationUtil.isValidEmail(email)) {
         return res.status(500).send({ error: 'Email is not valid' })
      }

      if (!validationUtil.isValidPassword(password)) {
         return res.status(500).send({ error: 'Password is not valid' })
      }
      // everything is OK
      var hashedPassword = await bcrypt.hash(password, 10);

      values = [username, hashedPassword, email, userTypeCode, fullname, createdOn, createdBy];
      var saveUserQuery = queries.queryList.SAVE_USER_QUERY;
      await dbConnection.dbQuery(saveUserQuery, values);
      return res.status(201).send("Successfully adding new user ");

   } catch (err) {
      console.log("Error : " + err);
      return res.status(500).send({ error: 'Failed to add new user' });
   }
}