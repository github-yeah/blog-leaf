---
title: "`CLI`从入门到开车"
sidebarDepth: 2
tags: 
    - cli
    - Command-Line
    - 脚手架
---


## 搭建 `TypeScript` 项目

`CLI`从入门到开车，车速较快

### 项目初始化

```bash
npm init
```

根据提示设置一下项目

### 安装本地依赖

```bash
npm install typescript ts-node -D
```

安装本地依赖后，可以使用 `tsc` 转译命令。

### 配置 `tsconfig.json`

```bash
tsc --init
```

按需配置 `tsconfig.json`

<<< @/leaf-cli/tsconfig.json
