const path = require("path");
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const { mongoConnect } = require("./database/database");
const MongoDBStore = require("connect-mongodb-session")(session);
const app = express();
const PORT = 4444;
const hbs = require("hbs");
const postRouter = require("./routes/pg");
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

app.use(express.urlencoded({ extended: true }));

const store = new MongoDBStore({
  uri: "mongodb://localhost:27017/mydb",
  collection: "sessions",
});

app.use(
  session({
    secret: "adjkasdjkavdabm ma ",
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      maxAge: 6000,
    },
  })
);
const allRoutes = require("./routes/routes");

app.use(passport.initialize());
app.use(passport.session());

require("./passport");

app.use("/", allRoutes);

app.use(express.json());
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/pgForBoys", postRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:` + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });