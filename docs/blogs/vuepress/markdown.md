---
title: "Markdown拓展"
sidebarDepth: 2
tags: 
    - markdown
---

## 连接

格式：```[连接文本](路径#锚点)```

**输入**：

```md
[点我跳转到本页自定义容器](#自定义容器-badge-text默认主题)
```

**结果**：
[点我跳转到本页`自定义容器`](#自定义容器)

::: tip

- 页面内跳转可以忽略路径，直接设置锚点即可
  
:::

## 表格

**输入**：

``` md
| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |
```

**结果**：

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

## 表情

**输入**：

```js
:tada: :100: :fallen_leaf:
```

**结果**：

:tada: :100: :fallen_leaf:

[更多可用表情](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)

## 自定义容器 <Badge text="默认主题"/>

**输入**：

```md
::: tip 提示
This is a tip
:::

::: warning 警告
This is a warning
:::

::: danger 危险
This is a dangerous warning
:::

::: details 详情自定义文本，点击后展开
This is a details block, which does not work in IE / Edge
:::
```

**输出**：

::: tip 提示
这是一个提示
:::

::: warning 警告
这是一个警告
:::

::: danger 危险
这是一个危险警告
:::

::: details 详情自定义文本，点击后展开
这是一个详情块，在 IE / Edge 中不生效
:::

## 代码Diff

**输入**：

```` diff
```diff
const unique = <T>(arr: T[]) => {
-       return Array.from(new Set<arr>);
+    return [...new Set(arr)];
}
```
````

**输出**：

```diff
const unique = <T>(arr: T[]) => {
-       return Array.from(new Set<arr>);
+    return [...new Set(arr)];
}
```

## 代码块以及语法高亮

**输入**：

````md
```js{3-5,7,9-11}
function snippet() {
    console.log("本行不高亮!");
    console.log("本行高亮!");
    console.log("本行高亮!");
    console.log("本行高亮!");
    console.log("本行不高亮");
    console.log("本行高亮!");
    console.log("本行不高亮");
    console.log("本行高亮!");
    console.log("本行高亮!");
    console.log("本行高亮!");
}
```
````

**输出**：

```js{3-5,7,9-11}
function snippet() {
    console.log("本行不高亮!");
    console.log("本行高亮!");
    console.log("本行高亮!");
    console.log("本行高亮!");
    console.log("本行不高亮");
    console.log("本行高亮!");
    console.log("本行不高亮");
    console.log("本行高亮!");
    console.log("本行高亮!");
    console.log("本行高亮!");
}
```

**代码高亮行数区间规则** <Badge text="逗号之间不要有空格" type="warning"/>

- 行数是从1开始（不是从0开始）
- 单行: `{n}`
- 跳行: `{n1,n3,n5}`
- 连续多行: `{n1-n3,n5-n9}`
- 组合: `{n1,n3-n5,n7,n8-n9}`

::: tip 提示
代码展示行号可以通过`.vuepress/config.js`中添加：

```js{3}
module.exports = {
    markdown: {
        lineNumbers: trrue
    }
};
```

:::

## 代码导入

语法规则：

```md
<<< @/代码文件路径#region{高亮行数区间}
```

::: tip

- 此处`@/` 默认指的是项目根目录
- 高亮行数区间参照[代码块以及语法高亮](#代码块以及语法高亮)
- `#region` 是可选项，可以实现导入代码文件中的局部代码块
  - 在代码文件中通过`#region xxx`指定截取的代码块开始区域
  - 在代码文件中通过`#endregion xxx`指定截取的代码块结束区域
  - 在导入代码时通过`<<< @/代码文件路径#xxx`来指定设置的区域
:::

**通过`#region`导入文件的部分代码块**

文件路径：`blog-leaf/src/vuepress/vuepress-code-snippet.js`

**输入**：

```md
<<< @/src/vuepress/vuepress-code-snippet.js#snippet1{2}
```

**输出**：

<<< @/src/vuepress/vuepress-code-snippet.js#snippet1{2}

::: details 点击查看`vuepress-code-snippet.js`的所有内容

**输入**：

```md
<<< @/src/vuepress/vuepress-code-snippet.js{2,6}
```

**输出**：

<<< @/src/vuepress/vuepress-code-snippet.js{2,6}

:::

## 直接使用原生JS和CSS

<<< @/src/vuepress/vuepress-use-html-js-css.html
