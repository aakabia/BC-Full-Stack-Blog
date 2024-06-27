const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const hbs = exphbs.create({});
const sequelize = require("./config/connection");

// Above are the packages I am importing to run my application.

const app = express();
const PORT = process.env.PORT || 3001;
// Above is the port my server is listening on and my instance of express.

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
// Above is the link to handle bars

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

// Above is the middleware I use for my server.

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
});

// Above, I start my serve with the app.listen
