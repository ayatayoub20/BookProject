var pool = require('./pool')

exports.dbQuery= (queryText, queryparms)=>{
    return new Promise((resolve, reject) => {
        pool.dbQuery(queryText,queryparms)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
         reject(err)
        })
})
}