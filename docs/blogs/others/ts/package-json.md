---
title: "配置package.json"
sidebarDepth: 2
tags: 
    - pakage
---


## `dependencies` vs `devDependencies`

- `dependencies`：项目运行所依赖的模块
    （通过`npm install xxx --save`安装的模块将会写入其中）
- `devDependencies`：项目开发所依赖的模块
    （通过`npm install xxx --save-dev`安装的模块将会写入其中）


## `scripts`脚本

在`package.json`中`scripts`里定义的脚本命令可以通过`npm run xxx`调用。

每次执行`npm run xxx`，就会自动创建一个 `Shell`，并在`Shell`里执行脚本命令。因此只要是`Shell`可以执行的命令，都可以写入脚本里。

另外，执行`npm run xxx`时，会自动将`node_modules/.bin`子目录加入`PATH`环境变量中，执行结束后再将`PATH`恢复原样。
这也意味着`node_modules/.bin`中的所有脚本都可以直接用脚本名直接调用而不必加上路径。
比如：

例如：假设你只是在本地开发环境装了`typescript`依赖，那么你只需要执行`tsc`就可以了不用加上路径（`./node_modules/.bin/tsc`）

```json
{
    "scripts": {
        // 编译项目
        "build": "tsc", 
        // 开启自动编译：监听文件变化并自动编译
        "build:dev": "tsc --watch"
    }
}
```

可以通过在终端中调用这些脚本命令

```bash
# 等价于在终端中调用 tsc
npm run build
# 等价于在终端中调用 tsc --watch
npm run build:dev
```

### 查看项目中所有的脚本命令

```bash
npm run
```

### 一个脚本命令执行多个任务

- 并发执行：使用`&`符号连接需要并发执行的命令，任务将会同时执行，没有执行先后顺序

    ```json
    {
        "scripts": {
            // ts-node file.ts 和 node file.js 同时执行，没有先后顺序
            "test": "ts-node file.ts & node file.js"
        }
    }
    ```

- 继发执行：使用`&&`符号连接需要继发执行的命令，命令将按照先后顺序执行。前一个任务完成后，下一个任务才会执行

    ```json
    {
        "scripts": {
            // 这个脚本在`tsc file.ts`命令执行完成后，才会继续执行`node file.js`
            "test": " tsc file.ts && node file.js"
        }
    }
    ```

### 钩子 `pre`和`post`

前置任务钩子格式：`prexxx`
后置置任务钩子格式：`postxxx`
当执行`npm run xxx`时，`npm`会自动检测钩子，并按照`prexxx`->`xxx`->`postxxx`的顺序执行

```json
{
    "scripts": {
        "prebuild": "rimraf ./dist",
        "build": " tsc a.ts",
        "postbuild": " node a.js"
    }
}
```

当执行`npm run build`时：会优先执行`prebuild`，然后执行`build`，最后执行`postbuild`

等价于：`npm run prebuild && npm run build && npm run postbuild`

### scripts snippts

```json
{
    "scripts": {
        // 打开浏览器
        "open:dev": "opener http://localhost:9090", 
        // 搭建本地http服务器
        "serve": "http-server -p 9090 dist/", 
        // 删除目录
        "clean": "rimraf dist/*", 
        // 编译ts文件
        "buildTs": "tsc",
    }
}
```

::: tip
以上脚本根据具体逻辑安装相关依赖
:::

## `bin`

配置命令，并映射到可执行文件的路径.

比如你想定义一个命令`leaf`，运行命令的时候执行`bin/leaf.js`，则可以这样配置：

```json
{
    "bin": {
        // 格式：[命令名称]: [命令路径]
        "leaf": "bin/leaf.js", 
    }
}
```

如果想使用`leaf`这个命令，则需要挂载到全局：
`npm install . -g`
或者
`npm link`（`npm unlink 可以解绑命令`）

此时就可以使用`leaf`命令了

`vue`命令就是这么实现的

如果想实现自己的脚手架（CLI），就会用到它。我们后续将会详细介绍。

