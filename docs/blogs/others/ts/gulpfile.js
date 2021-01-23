// #region js
// ======== 使用JavaScript实现gulpfile ========
// gulpfile.js
// 任务目的：编译ts文件并写入到`dist`目录下
const gulp = require("gulp");
const ts = require("gulp-typescript");

// 根据`tsconfig.json`配置编译选项
const tsProject = ts.createProject("tsconfig.json");

// task
const compileTask = () => tsProject
    // 读取文件生成`Node流`，默认读取`src`目录
    .src()
    // 编译`.ts`文件，生成`Node`流
    .pipe(tsProject())
    // 获取`js`文件类型的`Node流`
    .js
    // 把处理完的`Node`流写入`dist`目录下
    .pipe(gulp.dest("dist"));

// 执行task
gulp.task("default", compileTask);
// #endregion js








// #region ts
// ======== 使用TypeScript实现gulpfile ======== 
// gulpfile.ts
import * as gulp from "gulp";
import * as ts from "gulp-typescript";

// 读取配置
const tsProject = ts.createProject("tsconfig.json");


// 编译
const compile = () => tsProject
    // 读取文件生成`Node流`，默认读取`src`目录
    .src()
    // 编译`.ts`文件，生成`Node`流
    .pipe(tsProject())
    // 获取`js`文件类型的`Node流`
    .js
    // 把处理完的`Node`流写入`dist`目录下
    .pipe(gulp.dest("dist"));

// 创建任务：build; 执行`gulp build`即可执行此任务
gulp.task("build", compile);

// #endregion ts