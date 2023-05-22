var events = require('events');
var audit = require('../Model/auditModel');
var queries = require('../db/queries');
var dbConnection = require('../db/connection');


var emitter = new events.EventEmitter();
const auditEvent = "audit";
emitter.on(auditEvent,(audit)=>{
    
console.log("audit event emitter - Audit:"+JSON.stringify(audit));
//steps of function - save in db
try {
    values= [audit.auditAction,JSON.stringify(audit.data),audit.status,audit.error,audit.auditBy,audit.auditOna]
    var auditQyery = queries.queryList.AUDIY_QUERY;
     dbConnection.dbQuery(auditQyery,values); 
} catch (error) {
    console.log("audit event emitter error" + error)
}
});

exports.prepareAudit = function(auditAction,data,error,auditBy,auditOn){
    let status = 200;
    if(error)
    status = 500;
    
    var auditObj = new audit(auditAction,data,status,error,auditBy,auditOn);
    emitter.emit(auditEvent,auditObj);

}