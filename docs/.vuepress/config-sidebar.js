// 不同页面显示不同的侧边栏=========
module.exports = {
    "/blogs/vuepress/": [
        {
            title: "VuePress Guide",
            collapsable: false,
            children: [
                "",
                "theme",
                "markdown"
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
// module.exports = {
//     "/blogs/vuepress/": [
//         "",
//         "theme",
//         "markdown"
//     ],
//     "/blogs/vue/": [
//         "",
//         "introduce",
//     ]
// };



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