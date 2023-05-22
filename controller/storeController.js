var model = require('../Model/storeModel');
var queries = require('../db/queries');
var dbConnection = require('../db/connection');
var util = require('../util/utilty');

exports.getStoreList = async (req,res)=>{
   try {
    var storeListQuery = queries.queryList.GET_STORE_LIST;
    var result = await dbConnection.dbQuery(storeListQuery); 

    return res.status(200).send(JSON.stringify(result.rows));
   } catch (err) {
    console.log('error :' + err)
    return res.status(500).send({error: 'Failed to list store '});
   }
}

exports.saveStore =async (req,res)=>{
    try {
    var createdBy = "ayat";
    var createnOn = new Date();  
    //req body
    var storeName= req.body.storeName;
    var address= req.body.address;
      if (!storeName || !address) {
         return res.status(500).send({ error: 'storeName and address should not be empty' })
      }

      let storeCode = util.generateStoreCode();
      values= [storeName,storeCode,address,createdBy,createnOn]

      var saveStoreQuery = queries.queryList.SAVA_STORE_QUERY;
      await dbConnection.dbQuery(saveStoreQuery,values); 

     return res.status(201).send(' Successfuly adding new store ');
    } catch (error) {
        console.log('error :' + err)
        return res.status(500).send({error: 'Failed to add store'});
    }
    
   }