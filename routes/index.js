const fs = require("fs");
const router = require("express").Router();

const getIndex = function (file) {
  return file === "index.js";
};

const getJSFile = function (file) {
  return file.substr(-3) === ".js";
};

fs.readdirSync("./routes").forEach(file => {
  console.log(file);

  if (getJSFile(file) && !getIndex(file)) {
    const name = file.split(".")[0];
    const route = require("./" + file);
    router.use(`/${name}`, route);
  }
});

module.exports = router;