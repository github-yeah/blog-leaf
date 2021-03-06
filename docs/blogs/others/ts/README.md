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
npm install typescript --save-dev
```

安装`typescript`依赖后，可以使用`tsc`命令执行初始化、编译等行为

:::tip
在终端输入`tsc --all`可以查看所有`tsc`命令
:::

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

### 编译

安装`typescript`依赖后，我们就可以使用`tsc`命令编译`.ts`文件了。

- 编译整个工程
  - 单纯调用`tsc`命令，编译器会从当前目录逐级向上搜索`tsconfig.json`文件，并根据其配置进行编译。
  - 调用`tsc --project projectName`（或`tsc -p projectName`）可以指定一个包含`tsconfig.json`的目录，并根据其配置进行编译
- 编译指定`.ts`文件
  - 编译单个文件：`tsc file.ts`
  - 编译多个文件：`tsc file.ts file1.ts file2.ts`
- 自动编译
  - 监听文件并自动编译：`tsc --watch`（或`tsc -w`）
- 你可以通过编译参数改变默认编译配置
  - 比如：`tsc file.ts file2.ts --outDir dist`（将`dist`作为编译生成的`.js`的输出目录）

:::tip
在终端输入`tsc --all`可以查看所有`tsc`命令。

```bash
tsc --all
```

:::

### 使用`node`测试编译后生成的`.js`文件

```bash
node xx/xx/x.js
```

### 使用`ts-node`直接调用`.ts`文件

`node`只能调用`.js`文件，我们可以安装`ts-node`本地开发依赖，从而跳过编译直接调用`.ts`文件

1. 首先安装`ts-node`本地开发依赖

   ```bash
   npm install ts-node --save-dev
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
