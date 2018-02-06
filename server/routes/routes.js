var todoController = require("../controllers/todo-controller");

var routes = app => {
  //Create Todo
  app.post("/todos", todoController.create);
  //Get All Todos
  app.get("/todos", todoController.findAll);
};

module.exports = { routes };
