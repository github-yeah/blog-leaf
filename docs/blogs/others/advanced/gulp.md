---
title: "集成Gulp"
sidebarDepth: 1
tags: 
    - gulp
---

## 简介

引用：

我们将使用`gulp`作为自动化构建工具增强自己的工作流程。

以下内容基于你已经正确安装了`node`环境.

- [Gulp官方入门](https://www.gulpjs.com.cn/docs/getting-started/quick-start/)
- [TypeScript集成Gulp](https://www.tslang.cn/docs/handbook/gulp.html)

## 初始化项目

1. 创建工程目录并进入
2. 初始化工程

    ```bash
    npm init
    ```

## 安装`gulp`相关依赖

- 安装全局依赖

```bash
npm install gulp-cli -g
```

- 安装项目开发依赖

```bash
npm install --save-dev gulp
```

## `gulpfile`转译

- 针对`TypeScript`，`gulpfile.js`改名为`gulpfile.ts`并安装`ts-node`和`@types/gulp`本地开发依赖模块
- 针对`Babel`，`gulpfile.js`改名为`gulpfile.babel.ts`并安装`@babel/register`模块

## 创建`gulpfile.ts`

- 我们使用 `gulpfile.ts` 代替 `gulpfile.js` 实现任务脚本，需安装：

```bash
npm install --save-dev ts-node typescript @types/gulp
```

在项目的根目录创建`gulpfile.ts`，并写入一个`拷贝文件`的任务

`gulpfile.ts`内容：

```ts
import * as gulp from "gulp";

// 拷贝任务
const copyTask = (globs: string | string[], outDir: string) => () => gulp
    // 读取文件生成`Node流`
    .src(globs)
    // 把处理完的`Node`流写入`outDir`目录下
    .pipe(gulp.dest(outDir));


// 创建copy html的任务
const copyHtml = copyTask("src/**/*.html", "dist");

// 把任务加入到gulp task中
gulp.task("copy-html", copyHtml);
```

## 使用gulp

创建src目录，并新建test.html

此时项目目录结构：

```js
.
├── src
│   ├── test.html
├── node_modules
├── gulpfile.ts
├── tsconfig.json
└── package.json
```

在控制台输入：

```bash
gulp  copy-html  // 执行`gulpfile.ts`， 不加参数则等价于执行`default`任务：gulp default
```

`copy-html`任务可以把`src`目录下所有`.html`文件复制到`dist`目录下

执行完`gulp copy-html`后的项目目录结构：

```js
.
├── dist
│   ├── test.html
├── src
│   ├── test.html
├── node_modules
├── gulpfile.ts
├── tsconfig.json
└── package.json
```

这样，一个简单的`gulp`任务就完成了。

我们还可以使用`gulp`创建编译，打包等任务。

## 使用控制台参数

## 常用API

### 处理文件 `src()`和`dest()`

- `src()`-读取文件：创建一个流，接受`glob`参数，并从文件系统中读取`Vinyl`对象生成`Node流`
- `dest()`-写入文件：接受一个`输出目录`作为参数，并把通过管道（`pipe()` - pipeline）传输接收到的文件写入此目录

### task

...to be continued

### 组合任务 `series()`和`parallel()`

`series()`和`parallel()`都可以组合任务，并且可以相互嵌套（可以无限嵌套）

- `series`：组合后的任务按照组合顺序依次执行
- `parallel`：组合后的任务并发执行

### watch

监听 `globs` 并在发生更改时运行任务。任务与任务系统的其余部分被统一处理。

## 常用插件

### gulp-typescript
