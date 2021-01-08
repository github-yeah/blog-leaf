---
title: ":fallen_leaf: 快速开始"
sidebarDepth: 2
tags: 
    - VuePress
    - Guide
---

## Quick Star

### 安装配置

1. 进入项目根目录，并进行包管理器初始化

   ```bash
   npm init
   ```

2. 安装VuePress本地依赖

   ```bash
   npm install vuepress -d
   ```

3. 在根目录创建docs目录并新建README.md

   ```bash
   mkdir docs && echo '# Hello VuePress' > docs/README.md
   ```

4. 在`pakage.json`中新增`scripts`

   ```json
   {
     "scripts": {
        // 编译并启动浏览器
       "docs:dev": "vuepress dev docs --open --host \"localhost\"",
       "docs:build": "vuepress build docs"                     
     }
   }
   ```

5. 编译并启动本地服务器

   ```bash
   npm run docs:dev
   ```

### 目录结构

```js
.
├── docs
│   ├── .vuepress _(**存放：配置，组件，静态资源**)_
│   │   ├── `components` _(**可选，存放Vue组件，所有组件将被注册为全局组件**)_
│   │   ├── `theme` _(**可选，存放本地主题**)_
│   │   │   └── Layout.vue
│   │   ├── `public` _(**可选，存放静态资源**)_
│   │   ├── `styles` _(**可选，存放样式**)_
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── `config.js` _(**配置的入口**)_
│   │   └── `enhanceApp.js` _(**可选，客户端应用增强**)_
│   │ 
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│ 
└── package.json
```

文件相对路径和路由的对照规则：

| 文件相对路径       | 路由地址       |
| ------------------ | -------------- |
| `/README.md`       | `/`            |
| `/guide/README.md` | `/guide/`      |
| `/config.md`       | `/config.html` |
