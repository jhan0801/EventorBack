 const fs = require("fs");
 const getIndex = function (file) {
    return file === "index.js";
 };

 const getJSFile = function (file) {
    return file.substr(-3) === ".js";
 };

 const capitalize = function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
 };

 fs.readdirSync("./models").forEach(file => {
    if (getJSFile(file) && !getIndex(file)) {
       var name = file.split(".")[0];
       var model = require("./" + file);
       module.exports[capitalize(name)] = model;
    }
 });