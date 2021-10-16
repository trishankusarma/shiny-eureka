const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();
require("./db/db");

const routes = require("./routes");

const { SECRET } = process.env;

//middlewares
app.use(
  express.urlencoded({
    limit:"100mb",
    extended: true,
  })
);
app.use(cookieParser(SECRET));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json({limit:"100mb"}));

//routes
app.use("/", routes);

app.get("*", (req, res) => {
  res.status(404).send("Error 404! Page not Found!");
});

module.exports = app;
