var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var routes = require("./routes");
var mongoose = require("mongoose");
var cors = require("cors");
var mongoDB = process.env.MONGODB_URI || "mongodb://127.0.0.1/event";
var passport = require("passport");

mongoose.connect(
  mongoDB, {
    useNewUrlParser: true
  }
);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var app = express();

app.use(logger("dev"));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);
// app.use(cors);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", routes);



// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err.status + "babo bitch")
  res.json(err);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log("Listening on port " + port);
});

module.exports = server;