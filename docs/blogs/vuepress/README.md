---
title: VuePress指北
sidebarDepth: 1
tags: 
    - VuePress
---

## 安装配置

### 安装

我在安装



创建并进入一个新目录
包管理器初始化
    ```js
    npm init
    ```
安装VuePress
    ```js
    npm install vuepress -d
    ```


package.json#scripts
    ```js
    {
    ...
    "scripts": {
        "docs:dev": "vuepress dev docs --open --host \"localhost\"",
        "docs:build": "vuepress build docs"
    }
    ...
    }
    ```
执行
    ```js
    npm run docs:dev    // 编译并启动本地服务器
    npm run docs:build  // 构建
    ```

目录结构
├── docs
│   ├── .vuepress
│   │   ├── theme (本地存储的主题)
│   │   │   └── Layout.vue
│   │   ├── public (可选的)
│   │   ├── styles (可选的)
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── templates (可选的, 谨慎配置)
│   │   │   ├── dev.html
│   │   │   └── ssr.html
│   │   ├── config.js (可选的)
│   │   └── enhanceApp.js (可选的)
│   │ 
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│ 
└── package.json

