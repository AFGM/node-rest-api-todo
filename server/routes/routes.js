var todoController = require("../controllers/todo-controller");

var routes = app => {
  //Create Todo
  app.post("/todos", todoController.create);
};

module.exports = {routes};