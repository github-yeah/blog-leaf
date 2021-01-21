---
title: "package.json 和 tsconfig.json"
sidebarDepth: 2
tags: 
    - pakage
    - tsconfig
---

## pakage.json

### 初始化`package.json`

```bash
npm init
```

### `scripts` snippts

- `vuepress`（需安装`vuepress`）

    ```json
    {
        "scripts": {
            // 启动vuepress本地开发模式，并且自动打开浏览器预览
            "docs:dev": "vuepress dev docs . --open --host \"localhost\"", 
            // 构建vuepress
            "docs:build": "vuepress build docs ."
        },
    }
    ```

- `typescript`（需安装`ts-node`）

    ```json
    {
        "scripts": {
            // build之前先执行此命令, 如果使用`rimraf`需提前安装`rimraf`依赖
            "prebuild": "rimraf dist",
            // 编译ts
            "build": "tsc",
            // 编译并持续监听ts文件变化，ts文件变化后自动编译
            "build:dev": "tsc -w",
            // 执行 *.ts文件
            "start": "ts-node xxxxxx.ts",
        }
    }
    ```

## tsconfig.json

### 初始化`tsconfig.json`

```bash
tsc --init
```
