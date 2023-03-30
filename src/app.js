const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.static('shaw-frontend'));

app.use(bodyParser.json());

const userRoute = require('./routes/user-route');

app.use('/users', userRoute);

const port = process.env.port || 8080;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });

  app.listen(port);