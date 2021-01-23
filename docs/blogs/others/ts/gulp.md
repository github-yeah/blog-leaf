---
title: "gulp 配置"
sidebarDepth: 1
tags: 
    - gulp
---

## 简介

引用：

- [Gulp官方入门](https://www.gulpjs.com.cn/docs/getting-started/quick-start/)
- [TypeScript构建工具-Gulp](https://www.tslang.cn/docs/handbook/gulp.html)

## `gulpfile`转译

- 针对`TypeScript`，`gulpfile.js`改名为`gulpfile.ts`并安装`ts-node`和`@types/gulp`本地开发依赖模块
- 针对`Babel`，`gulpfile.js`改名为`gulpfile.babel.ts`并安装`@babel/register`模块

## 安装依赖

- 安装全局依赖

```bash
npm install gulp-cli -g
```

- 安装开发依赖

```bash
npm install typescript gulp gulp-typescript -D
```

- 如果使用 TypeScript 实现任务，即：`gulpfile.ts`代替`gulpfile.js`

```bash
npm install ts-node @types/gulp -D
```

## 创建`gulpfile.js`

在项目的根目录创建`gulpfile.js`

:::tip 写入任务后进行测试

在控制台输入：

```bash
gulp    // 执行`gulpfile.js`， 不加参数则等价于：gulp default
node folder/file.js     // 运行编译完的具体js文件
```

:::

## 常用API

### 处理文件 `src()`和`dest()`

- `src()`-读取文件：创建一个流，接受`glob`参数，并从文件系统中读取`Vinyl`对象生成`Node流`
- `dest()`-写入文件：接受一个`输出目录`作为参数，并把通过管道（`pipe()` - pipeline）传输接收到的文件写入此目录

使用`gulpfile.js`实现：

<<< @/docs/blogs/others/ts/gulpfile.js#js

使用`gulpfile.ts`实现：

<<< @/docs/blogs/others/ts/gulpfile.js#ts
  
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
