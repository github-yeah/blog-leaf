const gulp = require("gulp");
const ts = require("gulp-typescript");

// ts project
const tsProject = ts.createProject("tsconfig.json");

// task
const taskFn = () => tsProject
    .src()
    .pipe(tsProject())
    .js
    .pipe(gulp.dest("dist"));

// 执行task
gulp.task("default", taskFn);