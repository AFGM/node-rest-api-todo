//Library Imports
var express = require("express");
var bodyParser = require("body-parser");

//Local Imports
var { mongoose } = require("./db/mongoose");
var routes = require("./routes/routes");

const app = express();
app.use(bodyParser.json()); //middleware to convert body on javascript object
routes(app); //app routings

app.listen(3000, () => {
  console.log("Started on port 3000!");
});
