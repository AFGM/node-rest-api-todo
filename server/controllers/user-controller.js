const { User } = require("../models/user");
const _ = require("lodash");

/**
 * Create User
 * @param {*} req
 * @param {*} res
 */
exports.create = (req, res) => {
  var body = _.pick(req.body, ["email", "password"]);
  var user = new User(body);
  user
    .save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then(token => {
      res.header("x-auth", token).send(user); //custom header
    })
    .catch(e => res.status(404).send(e));
};
