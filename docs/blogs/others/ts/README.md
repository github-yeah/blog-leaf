---
title: "TypeScript项目配置"
sidebarDepth: 2
tags: 
    - ts
    - typescript
    - pakage
    - tsconfig
---

## :fallen_leaf: Quick Start

::: tip
这里假定你已经安装了node环境
:::

### 初始化 `package.json`

1. 创建工程目录，并进入此目录
2. 执行初始化命令（最终会在工程根目录生成 `package.json`）

    ```bash
    npm init
    ```

3. 根据提示修改配置，也可以全部使用默认配置（后期可在`package.json`中手动修改）

### 安装`typescript`本地开发依赖

```bash
npm install typescript -D
```

安装`typescript`依赖后，可以使用`tsc`命令执行初始化、编译等行为

### 初始化`tsconfig.json`

```bash
tsc --init
```

执行此命令后将会在项目根目录生成`tsconfig.json`

目录结构：

```js
.
├── package.json
└── tsconfig.json
```

### 使用`tsc`进行编译

- 单纯调用`tsc`命令，编译器会从当前目录逐级向上搜索`tsconfig.json`文件，并根据配置进行编译
- 调用`tsc --project projectName`或`tsc -p projectName`可以指定一个包含`tsconfig.json`的目录
- `tsc --watch`，监听文件变化后自动编译
- `tsc xx.ts`，只编译`xx.ts`文件
- `tsc` 后面还可以跟很多参数，这里后面再介绍

### 使用`node`测试编译后生成的`.js`文件

```bash
node xx/xx/x.js
```

### 使用`ts-node`直接调用`.ts`文件

`node`只能调用`.js`文件，我们可以安装`ts-node`本地开发依赖，从而跳过编译直接调用`.ts`文件

1. 首先安装`ts-node`本地开发依赖

   ```bash
   npm install ts-node -D
   ```

2. 直接调用`.ts`文件

   ```bash
   ts-node xxx/xxx/x.ts
   ```

此时一个最最纯净的`ts`项目就创建完成了。

...

...

...

...

...

...

...

...

...

...

想什么呢！这才刚刚开始！
