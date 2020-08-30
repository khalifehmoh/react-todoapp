
var mongoose = require('mongoose');

// add connection here

var todoSchema = new mongoose.Schema({
    item: String
})

var TodoModel = mongoose.model('todo', todoSchema);

const getTodos = function (res) {
    TodoModel.find({}, function (err, data) {
        if (err) throw err;
        res.send(data);
    })
}

module.exports = function (app) {
    app.get('/getTodos', function (req, res) {
        getTodos(res)
    });
    app.post('/addTodo', function (req, res) {
        TodoModel(req.body).save(function (err, data) {
            if (err) throw err
            getTodos(res)
        })
    });
    app.post('/deleteTodo', function (req, res) {
        TodoModel.find({ _id: req.body.id }).deleteOne(function (err, data) {
            if (err) throw err;
            getTodos(res)
        })
    });
}