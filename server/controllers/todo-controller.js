var { Todo } = require("../models/todo");

/**
 * Create and Add Note
 * @param {request object} req 
 * @param {response object} res 
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
