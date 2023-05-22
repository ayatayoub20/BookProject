// setup server
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
//var noteRoute = require('./route/noteRoute')
var storeRoute = require('./route/storeRoute');
var bookRoute = require('./route/bookRoute');
var userRoute = require('./route/userRoute');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { Router } = require('express');

const app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

 app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  //app.use('/note', noteRoute);
  app.use('/api/', storeRoute);
  app.use('/api/', bookRoute);
  app.use('/api/', userRoute);

  
  app.listen(8000, () => {
    console.log('server start');
  })





   