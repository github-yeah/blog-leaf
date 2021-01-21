---
title: "Command-Line Interface"
sidebarDepth: 2
tags: 
    - cli
    - Command-Line
    - 脚手架
---

## CLI（Command-Line Interface）

脚手架的搭建

### 依赖库

[commander](https://www.npmjs.com/package/commander) （命令工具）
[download](https://www.npmjs.com/package/download) （文件下载）
[fs-extra](https://www.npmjs.com/package/fs-extra) （本地文件操作）
[inquirer](https://www.npmjs.com/package/inquirer) （命令行交互）
[update-notifier](https://www.npmjs.com/package/update-notifier) （pm在线检查更新）
[chalk](https://www.npmjs.com/package/chalk) （控制台输出内容样式）
[log-symbols](https://www.npmjs.com/package/log-symbols) （日志美化）
[ora](https://www.npmjs.com/package/ora) （Spinner等待动画）

### 初始化

1. 初始化`package.json`

    ```bash
    npm init
    ```

2. 使用ts需初始化`tsconfig.json`

    ```bash
    tsc --init
    ```

3. 使用ts需安装`typescript`相关依赖

    ```bash
        npm install ts-node -D
        npm install typescript -d
        npm install ts-loader -D
        npm install @types/node -D
    ```

4. 安装依赖库

    ```bash
        npm install commander download fs-extra inquirer update-notifier chalk log-symbols ora  -d
    ```
