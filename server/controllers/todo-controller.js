var { Todo } = require("../models/todo");
var { ObjectID } = require("mongodb");

/**
 * Create and Add Note
 * @param {express request object} req
 * @param {express response object} res
 */
exports.create = (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo
    .save()
    .then(doc => {
      res.send(doc);
    })
    .catch(e => res.status(400).send(e));
};

/**
 * Find all Notes
 * @param {*} req
 * @param {*} res
 */
exports.findAll = (req, res) => {
  Todo.find({})
    .then(todos => {
      res.send({ todos }); //send object instead array so can add more fields to KSON
    })
    .catch(e => res.status(400).send(e));
};

/**
 * Find Todo by Id
 * @param {*} req
 * @param {*} res
 */
exports.findByID = (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    })
    .catch(e => {
      res.status(400).send();
    });
};

exports.deleteById = (req, res) => {
  var id = req.params.id;
  console.log(id);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    })
    .catch(e => {
      res.status(400).send();
    });
};
