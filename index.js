var gulp = require("gulp");
var series = require("run-sequence").use(gulp);
var task = require("./lib/task");
var vars = require("./lib/gen-vars");
var config = require("./lib/config");

var build = function(opts) {
  return function() {
    return task.build(Object.assign(opts, { message: "build element theme" }));
  };
};

var fonts = function(opts) {
  return function() {
    return task.fonts(Object.assign(opts, { message: "build theme font" }));
  };
};

var wrap = function(opts) {
  return function() {
    return task.wrap(opts);
  };
};

var move = function(opts) {
  return function() {
    return task.move(opts);
  };
};
/**读取var.scss内容，写入创建好的eleemnt-variables.scss */
exports.init = function(filePath) {
  filePath = {}.toString.call(filePath) === "[object String]" ? filePath : "";
  vars.init(filePath);
};

exports.watch = function(opts) {
  gulp.task("build", build(opts));
  exports.run(opts);
  gulp.watch(opts.config || config.config, ["build"]);
};

exports.run = function(opts, cb) {
  gulp.task("build", build(opts));
  gulp.task("fonts", fonts(opts));
  if (typeof cb === "function") {
    return series("build", "fonts", cb);
  }
  return series("build", "fonts");
};

exports.cssWrap = function(opts) {
  gulp.task("wrap", wrap(opts));
  gulp.task("move", move(opts));
  return series("wrap", "move");
};