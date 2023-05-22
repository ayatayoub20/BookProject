const { Pool } = require('pg')
const dotenv = require('dotenv')
dotenv.config();

const db_Config = {
    connectionString: process.env.database_url,
    connectionTimeoutMillis: 300,
    idleTimeoutMillis: 200,
    max: 20,
  }

  const pool = new Pool(db_Config);

  pool.on('connect', (client) => {
    console.log('database is connect')
  })

  pool.on('remove', (client) => {
    console.log('database is removed')
  })

  module.exports = pool;