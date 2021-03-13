---
title: "配置tsconfig.json"
sidebarDepth: 1
tags: 
    - ts
    - typescript
    - tsconfig
---

## `tsconfig.json`中的配置参数

- `files`：编译器`包含`的文件对应的`相对或绝对的路径`列表
- `include`：编译器`包含`的文件对应的`glob匹配模式`列表
- `exclude`：编译器`排除`的文件对应的`glob匹配模式`列表
- `outDir`：重定向输出目录（编译器默认`排除`此目录下的所有文件，除非在`files`中指定了包含）
- `typeRoots`：类型的`根目录`，如果没有指定`typeRoots`默认是`@types`（比如：`node_modules/@types`）
- `types`：如果指定了`types`，则只有`类型根目录`下被`types`指定的包才会包含进来

::: tip 参数设置冲突匹配规则

- `files`优先级最高。不管`exlude`如果设置，`files`指定的文件总被包含在内
- `exclude`优先级大于`include`，即：被`exclude`和`include`同时指定的文件最终会被编译器`排除`
- `types`指定了`typeRoots`目录下具体的被包含的包列表
:::

## 文件路径支持的glob通配符

- `*` 匹配0或多个字符（不包括目录分隔符）
- `?` 匹配一个任意字符（不包括目录分隔符）
- `**/` 递归匹配任意子目录

点击查看完整[tsconfig.json选项](https://www.tslang.cn/docs/handbook/compiler-options.html)

## extends

```json
// 被继承文件：`./configs/base.json`
{
    "extends": "./configs/base",
    "files": ['main.ts] // files将会覆盖base.json中的files
}
```

## 项目引用

### 介绍

目的：

- 更好的组织代码解构
- 提高类型检查和编译的效率，减少编译器内存占用

主工程的`tsconfig.json` 通过 `references` 指明需要引用的工程

```json
{
    "compilerOptions": {},
    "references": [
        // 如果设置了 `prepend`，被依赖的项目必须有`outFile`选项
        {"path": "包含`tsconfig.json`的目录或`目录/tsconfig.json`本身", "prepend": "前置此依赖的构建输出行为（建当前项目之前先构建此依赖）"}
    ]
}
```

:::tip
关于`prepend`:
假设 `D`引入了`B`和`C`作为`前置(prepend)`依赖，同时`B`和`C`都引入了`A`，此时在`D`的最终输出里辉存在两个`A`，有可能引发未知错误
:::

被引用工程的`tsconfig.json`

```json
{
    "compilerOptions": {
        // 被引用的工程必须设置`composite`
        "composite":true,
        "rootDir":"如果不设置此选项默认为包含本`tsconfig.json`文件的目录",
        // 被引用的工程开启了`composite`则必须开启 `declaration`
        "declaration": true,
    },
}
```

### 构建

当单纯的执行`tsc`命令的时候并不会自动构建引入的依赖项目，除非启用的 `--build`选项

```bash
tsc -b
或
tsc --build
```

构建流程：

- 查找所有引用的工程（`tsconfig.json`中的`references`）
- 检查他们是否是最新版本
- 按照顺序构建非最新版本的工程

`tsc -b` 支持的选项：

- --verbose：打印详细的日志（可以与其它标记一起使用）
- --dry: 显示将要执行的操作但是并不真正进行这些操作
- --clean: 删除指定工程的输出（可以与--dry一起使用）
- --force: 把所有工程当作非最新版本对待
- --watch: 观察模式（可以与--verbose一起使用）

:::tip

- 使用`tsc -b` 来代替 `tsc`
- 使用 `tsc -b --watch` 来代替 `tsc --watch`
:::
