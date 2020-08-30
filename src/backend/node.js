const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const todoController = require('./todo-controller');

// middlewares methods
app.use(express.static('../'));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());

// fire controllers
todoController(app);

app.listen(4000, '192.168.1.17');
console.log('listening on 4000');