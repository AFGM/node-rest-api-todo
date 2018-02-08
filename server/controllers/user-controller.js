const { User } = require("../models/user");
const _ = require("lodash");

/**
 * Create User
 * @param {*} req
 * @param {*} res
 */
exports.create = (req, res) => {
  var body = _.pick(req.body, ["email","password"]);
  var user = new User(body);
  user
    .save()
    .then(user => {
      res.send(user);
    })
    .catch(e => res.status(404).send(e));
};
