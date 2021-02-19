//#region pageMatch
// 不同页面显示不同的侧边栏=========
module.exports = {
    // 页面路由地址为key，当打开这个路由对应的页面时，侧边栏将按照以下展示
    "/blogs/vuepress/": [
        {
            title: "Guide",
            collapsable: false,
            children: [
                "",
                "theme",
                "markdown",
                "use-vue",
                "deploy"
            ]
        },
        {
            title: "Advanced",
            collapsable: false,
            children: [
                "advanced",
                "Front-Matter",
                "slot"
            ]
        }
    ],
    "/blogs/vue/": [
        {
            title: "Vue Guide",
            collapsable: false,
            children: [
                "",
                "templete-syntax"
            ]
        }
    ],
    "/blogs/cli/": [
        {
            title: "Command-Line Interface",
            collapsable: false,
            children: [
                "",
                "gulp",
                "child-process"
            ]
        }
    ],
    "/blogs/others/": [
        {
            title: "TypeScript",
            collapsable: false,
            children: [
                "ts/",
                "ts/package-json",
                "ts/tsconfig-json",
                "ts/gulp"
            ]
        },
        {
            title: "Advanced",
            collapsable: false,
            children: [
                "",
                "vscode",
                "CLI"
            ]
        },
    ],
};
//#endregion pageMatch




// 全局侧边栏==============
// module.exports = [
//     ["/blogs/vuepress/theme.md", "我是主题"],
//     ["/blogs/vuepress/markdown.md", "我是markdown"]
// ];




// 全局侧边栏分组==============
// module.exports = [
//     {
//         title: "VuePress组",
//         path: "/blogs/vuepress/",
//         collapsable: false,
//         sidebarDepth: 2,
//         children: [
//             "/",
//             "theme"
//         ]
//     },
//     {
//         title: "Vue组",
//         path: "/blogs/vue/",
//         collapsable: false,
//         sidebarDepth: 2,
//         children: [
//             "/",
//             "introduce"
//         ]
//     }
// ];