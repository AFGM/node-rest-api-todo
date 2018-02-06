var todoController = require("../controllers/todo-controller");

const routes = app => {
  //Create Todo
  app.post("/todos", todoController.create);
};

module.exports = routes;