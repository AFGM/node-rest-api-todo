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

/**
 * Get User email and id
 * @param {*} req
 * @param {*} res
 */
exports.info = (req, res) => {
  res.send(req.user);
};

/**
 * Find User by Credentials
 * @param {*} req
 * @param {*} res
 */
exports.login = (req, res) => {
  var body = _.pick(req.body, ["email", "password"]);
  User.findByCredentials(body.email, body.password)
    .then(user => {
      return user.generateAuthToken().then(token => {
        console.log(user);
        res.header("x-auth", token).send(user); //custom header
      });
    })
    .catch(e => {
      res.status(400).send();
    });
};
