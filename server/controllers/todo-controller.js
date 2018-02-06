var { Todo } = require("../models/todo");

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
