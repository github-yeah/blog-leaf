
// package
const package = require("../../package.json");

// nav
const nav = require("./config-nav.js");

// sidebar
const sidebar = require("./config-sidebar.js");

module.exports = {
    title: package.name,
    description: package.description,
    base: "/blog-leaf/",
    head: [
        ["link", { rel: "icon", href: "assets/favicon.png" }],
        ["meta", { name: "viewport", content: "width=device-width,initial-scale=1,user-scalable=no" }]
    ],
    themeConfig: {
        // 导航
        nav: nav,
        // 侧边栏。可以设置为boolean类型， 表示所有界面都开启自动生成侧边栏
        sidebar: sidebar,
        // 导航栏logo
        logo: 'assets/favicon.png',
        // 获取最后一次 git 提交的时间并以日期格式显示在页面的底部
        lastUpdated: '最后更新',
        // 仓库连接地址
        repo: "https://github.com/github-yeah/blog-leaf",
        // 仓库连接在导航栏最后一个位置所展示的文本内容
        repoLabel: "Github",
        // 页面滚动
        smoothScroll: true
    },
    markdown: {
        lineNumbers: true   // 代码显示行号
    }
};