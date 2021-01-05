
// package
const package = require("../../package.json");

// nav
const nav = require("./config-nav.js");

// sidebar
const sidebar = require("./config-sidebar.js");

module.exports = {
    title: package.name,
    description: package.description,
    head: [
        ["link", { rel: "icon", href: "/favicon.ico" }],
        ["meta", { name: "viewport", content: "width=device-width,initial-scale=1,user-scalable=no" }]
    ],
    themeConfig: {
        nav: nav,                   // 导航
        sidebar: sidebar        // 侧边栏
    },
    markdown: {
        lineNumbers: true   // 代码显示行号
    }
};