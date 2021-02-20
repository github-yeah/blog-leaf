---
title: blog-leaf Guide
sidebarDepth: 2
tags: 
    - VuePress
    - Guide
---

## Quick Star

1. 安装

    ```bash
    npm install
    ```

2. 启动本地服务器（自动打开浏览器进行本地预览）

    ```bash
    npm run docs:dev
    ```

3. 发布

    ```bash
    npm run docs:publish
    ```
  
    ::: tip

    - 也可以在项目terminal中执行`./deploy.sh`
    - 自动构建
    - 自动提交到`gh-pages`分支
    - 可以自定义`deploy.sh`中的配置
    :::

4. [自动化集成](../blogs/vuepress/deploy.md#Push代码时触发自动部署)<Badge text="施工中..." type="warning"/>
