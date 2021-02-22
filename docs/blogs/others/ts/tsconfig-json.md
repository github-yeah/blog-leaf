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
