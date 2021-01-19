
module.exports = [
    { text: "Home", link: "/" },
    {
        text: "Category",
        items: [
            {
                text: "Archives",
                items: [
                    { text: "vue", link: "/blogs/vue/" },
                    { text: "vuepress", link: "/blogs/vuepress/" },
                    { text: "others", link: "/blogs/others/" }
                ]
            },
            {
                text: "Guide",
                items: [
                    { text: "introduce", link: "/guide/" }
                ]
            }
        ]
    },
    {
        text: "Contact",
        ariaLabel: "Contact Menu",
        items: [
            { text: "Vue", link: "https://cn.vuejs.org/v2/guide/" },
            { text: "VuePress", link: "https://www.vuepress.cn/" }
        ]
    },
];