---
title: "默认主题配置"
sidebarDepth: 1
tags: 
    - 主题
    - theme
---

## 导航栏

导航栏通过`.vuepress/config.js`中的`themeConfig.nav`配置

```js{4}
// .vuepress/config.js
module.exports = {
    themeConfig: {
        nav: [  // 导航栏配置
            // 单一link导航项=====================
            {
                text: "Home",      
                link: "/"                // 导航连接，'/'等价于'/README.md'
            },
            {
                text: "Guide",       // 导航文本
                link: "/guide/"       // 导航连接，'/guide/'等价于'/guide/README.md'
            },
            // 下拉列表导航项=====================
            {
                text: "Contact",
                ariaLabel: "Contact Menu",  // 别名
                items: [ // 下拉列表
                    { text: "Vue", link: "https://cn.vuejs.org/v2/guide/" },
                    { text: "VuePress", link: "https://www.vuepress.cn/" }
                ]
            }，
            // 下拉列表分组, 每个组之间以横线隔开=====================
            {
                text: "Category",    // 导航文本
                items: [                   // 下拉列表
                    {
                        text: "Archives",       // 下拉列表分组文本
                        items: [                    // 分组列表（嵌套列表）
                            { text: "vue", link: "/blogs/vue/" },   // 分组内子项
                            { text: "vuepress", link: "/blogs/vuepress/" }
                        ]
                    },
                    {
                        text: "Guide",
                        items: [
                            { text: "introduce", link: "/guide/" }
                        ]
                    }
                ]
            }
        ]
    }
}
```

::: tip
全局禁用导航栏：

```js{4}
// .vuepress/config.js
module.exports = {
    themeConfig: {
        navbar: false
    }
}
```

你也可以通过 YAML front matter 来禁用某个指定页面的导航栏

```js
// xxxx.md
---
navbar: false
---
```

:::

## 侧边栏

导航栏通过`.vuepress/config.js`中的`themeConfig.sidebar`配置

可以忽略`.md`扩展名: `*/guide`指的是`*/guide.md`

同时以`/`结尾的路径辉被视为`*/README.md`: `*/guide/`指的是`*/guide/README.md`

侧边栏可以是多个`md`文件的标题组合

格式为：`[link, text]`，`text`为可选内容。不设置则自动读取`md`文件中的`title`或第一个`header`

::: tip 侧边栏会自动合并所有md文件的标题，规则如下：

1. `[link, text]`设置了`text`，则标题为`text`
2. 读取`md`文件内通过`YAML front matter`设置的`title`
3. 读取`md`文件第一个header

:::

### 侧边栏可以自动获取页面内的嵌套标题

::: tip 嵌套标题自动获取配置规则如下：

1. 通过 `.vuepress/config.js`中的`themeConfig.sidebarDepth`设置全局嵌套深度

    ```js
    // .vuepress/config.js
    module.exports = {
        themeConfig: {
            // 深度最大为2（0: 禁用标题，1: 读取h2标题，2: 读取h2和h3）
            sidebarDepth: 2     
        }
    }
    ```

2. 在`md`文件内通过`YAML front matter`设置的`title`

    ```js
    // */*.md
    ---
    sidebarDepth: 2  // 深度最大为2（0: 禁用标题，1: 读取h2标题，2: 读取h2和h3）
    ---
    ```

:::

### 侧边栏实例

::: tip 侧边栏配置有很多种方式：

1. 全局侧边栏

    ```js
    // .vuepress/config.js
    module.exports = {
        themeConfig: {
            sidebar: [
                '/',
                '/page-a',
                ['/page-b', 'Explicit link text']       // 通过`text`自定义标题
            ]   
        }
    }
    ```

2. 全局侧边栏分组

    ```js
    // .vuepress/config.js
    module.exports = [
        {
            title: "VuePress组",
            path: "/blogs/vuepress/",
            collapsable: false,
            sidebarDepth: 2,
            children: [
                "/",
                "theme"
            ]
        },
        {
            title: "Vue组",
            path: "/blogs/vue/",
            collapsable: false,
            sidebarDepth: 2,
            children: [
                "/",
                "introduce"
            ]
        }
    ];
    ```

3. 不同页面显示不同的侧边栏

```js{3}
// .vuepress/config.js
module.exports = {
    "/blogs/vuepress/": [
        {
            title: "Guide",
            collapsable: false,
            children: [
                "",
                "theme",
                "markdown"
            ]
        },
        {
            title: "Advanced",
            collapsable: false,
            children: [
                "advanced"
            ]
        }
    ],
    "/blogs/vue/": [
        {
            title: "Vue Guide",
            collapsable: false,
            children: [
                "",
                "introduce",
            ]
        }
    ]
};
```

:::
