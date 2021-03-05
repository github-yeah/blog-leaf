---
title: "`CLI`从入门到开车"
sidebarDepth: 2
tags: 
    - cli
    - Command-Line
    - 脚手架
---

## 概述

`CLI` 直译就是命令行界面：通过终端命令进行人机交互。
通过一些简单的命令来进行大量琐碎且重复性高的工作（配置环境、集成工具，打包，发布等），
从而让我们有更多的精力专注于业务。

### 开始之前

- 我们将使用`TypeScript`进行业务逻辑的编写
- 内容适用于对`cli`不太了解的小白

## 搭建 `TypeScript` 项目

### 项目初始化

```bash
npm init
```

根据提示设置一下项目

### 安装项目开发依赖

```bash
npm install --save-dev typescript ts-node
```

安装`typescript`本地依赖后，可以使用 `tsc` 转译命令。

### 配置 `tsconfig.json`

```bash
tsc --init
```

按需配置 `tsconfig.json`

<<< @/leaf-cli/tsconfig.json

## 配置可执行命令

1. 创建`leaf.ts`作为命令的可执行入口文件

   ```ts
    #!/usr/bin/env node

    console.log("从0开始CLI");
   ```

   :::tip
   开头的`#!/usr/bin/env node`不能少，这指定了node环境的路径
   :::

2. 在`package.json`中通过`bin`配置命令对应的可执行文件地址

    ```js
    // package.json
    {
        "bin": {
            "leaf": "./bin/leaf.js"
        }
    }
    ```

3. 执行`tsc`命令，编译`leaf.ts`生成`leaf.js`

   :::tip
   可以通过运行`tsc -w`，监听自动编译`leaf.ts`
   :::

4. 在`CLI`项目根目录下执行`npm link`，把`bin`中配置的命令挂载到全局来进行本地测试

    ```bash
    # <project root dir> 
    npm link
    ```

    :::tip  解除指令

    ```bash
    # <project root dir> 
    npm unlink
    ```

    :::

5. 执行自定义的命令

    ```bash
    leaf
    ```

    :::tip
    控制台将输出：`从0开始CLI"`
    :::

### 目录结构

```js
.
├── bin _(**命令可执行文件目录**)_
│   ├── leaf.ts _(**leaf命令对应的可执行文件**)_
├── node_modules
├── package.json
└── tsconfig.json
```

这样我们就实现了一个自定义的全局命令，就是这么简单

接下来，让我们搞点花里胡哨的东西

### 常用依赖库

- [commander](https://www.npmjs.com/package/commander) （命令工具）
- [download](https://www.npmjs.com/package/download) （文件下载）
- [fs-extra](https://www.npmjs.com/package/fs-extra) （本地文件操作）
- [inquirer](https://www.npmjs.com/package/inquirer) （命令行交互）
- [update-notifier](https://www.npmjs.com/package/update-notifier) （pm在线检查更新）
- [chalk](https://www.npmjs.com/package/chalk) （控制台输出内容样式）
- [log-symbols](https://www.npmjs.com/package/log-symbols) （日志美化）
- [ora](https://www.npmjs.com/package/ora) （Spinner等待动画）


继续实现一个纯净项目的cli

```ts
// 执行 create命令 name参数为必选，不设置将会报错
program.command('create <name>')
// 执行 create命令 name参数为可选
program.command('create [name]')   
```

### `typescript` 编译过程 （单独创建一个md说明）

```ts
import * as ts from "typescript";
```

- 设置编译选项 `ts.CompilerOptions`：
  - 通过读取本地`tsconfig.json`
  - 手动编写
- 通过调用 `ts.createProgram`创建 `ts.Program`，传入将要编译的文件列表`rootNames`
- 调用 `ts.Program.emit` 编译文件

```ts
/**
 * import * as ts from "typescript";
 * 
 * 关于 `writeFile`: ts.WriteFileCallback：
 * 执行 `ts.Program.emit`时，文件编译完成后会调用 `writeFile` 处理编译后的内容
 * 如果调用 `ts.Program.emit` 的时候传入`writeFile` 参数，则文件编译完成后执行`writeFile`（`ts.CompilerHost.writeFile` 将被忽略）
 * 否则文件编译完成后会执行 `ts.CompilerHost.writeFile`
 * 
 * 关于 `ts.CompilerHost`
 * 可以通过调用`ts.createProgram`创建 `ts.Program`的时候以`host`参数的形式传入
 * 如果传入的`host`为空，则`ts.createProgram`会通过 `ts.createCompilerHost` 创建一个默认的host
 * 另外：可以修改`ts.CompilerHost.writeFile`更改写入行为
 * 通过`ts.createCompilerHost`创建的host，writeFile被调用的时候会把编译后的文件根据编译选项配置写入硬盘
*/
```