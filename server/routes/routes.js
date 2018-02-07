var todoController = require("../controllers/todo-controller");

var routes = app => {
  //Create Todo
  app.post("/todos", todoController.create);
  //Get All Todos
  app.get("/todos", todoController.findAll);
  //Find Todo by Id
  app.get("/todos/:id", todoController.findByID);
  //Delete Todo by Id
  app.delete("/todos/:id", todoController.deleteById);
};

module.exports = { routes };
