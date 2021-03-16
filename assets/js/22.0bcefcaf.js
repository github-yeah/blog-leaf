(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{392:function(s,t,a){"use strict";a.r(t);var n=a(43),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h2",{attrs:{id:"dependencies-vs-devdependencies"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#dependencies-vs-devdependencies"}},[s._v("#")]),s._v(" "),a("code",[s._v("dependencies")]),s._v(" vs "),a("code",[s._v("devDependencies")])]),s._v(" "),a("ul",[a("li",[a("code",[s._v("dependencies")]),s._v("：项目运行所依赖的模块\n（通过"),a("code",[s._v("npm install xxx --save")]),s._v("安装的模块将会写入其中）")]),s._v(" "),a("li",[a("code",[s._v("devDependencies")]),s._v("：项目开发所依赖的模块\n（通过"),a("code",[s._v("npm install xxx --save-dev")]),s._v("安装的模块将会写入其中）")])]),s._v(" "),a("h2",{attrs:{id:"scripts脚本"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#scripts脚本"}},[s._v("#")]),s._v(" "),a("code",[s._v("scripts")]),s._v("脚本")]),s._v(" "),a("p",[s._v("在"),a("code",[s._v("package.json")]),s._v("中"),a("code",[s._v("scripts")]),s._v("里定义的脚本命令可以通过"),a("code",[s._v("npm run xxx")]),s._v("调用。")]),s._v(" "),a("p",[s._v("每次执行"),a("code",[s._v("npm run xxx")]),s._v("，就会自动创建一个 "),a("code",[s._v("Shell")]),s._v("，并在"),a("code",[s._v("Shell")]),s._v("里执行脚本命令。因此只要是"),a("code",[s._v("Shell")]),s._v("可以执行的命令，都可以写入脚本里。")]),s._v(" "),a("p",[s._v("另外，执行"),a("code",[s._v("npm run xxx")]),s._v("时，会自动将"),a("code",[s._v("node_modules/.bin")]),s._v("子目录加入"),a("code",[s._v("PATH")]),s._v("环境变量中，执行结束后再将"),a("code",[s._v("PATH")]),s._v("恢复原样。\n这也意味着"),a("code",[s._v("node_modules/.bin")]),s._v("中的所有脚本都可以直接用脚本名直接调用而不必加上路径。\n比如：")]),s._v(" "),a("p",[s._v("例如：假设你只是在本地开发环境装了"),a("code",[s._v("typescript")]),s._v("依赖，那么你只需要执行"),a("code",[s._v("tsc")]),s._v("就可以了不用加上路径（"),a("code",[s._v("./node_modules/.bin/tsc")]),s._v("）")]),s._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 编译项目")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"build"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"tsc"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" \n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 开启自动编译：监听文件变化并自动编译")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"build:dev"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"tsc --watch"')]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("p",[s._v("可以通过在终端中调用这些脚本命令")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 等价于在终端中调用 tsc")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" run build\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 等价于在终端中调用 tsc --watch")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" run build:dev\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("h3",{attrs:{id:"查看项目中所有的脚本命令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#查看项目中所有的脚本命令"}},[s._v("#")]),s._v(" 查看项目中所有的脚本命令")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" run\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"一个脚本命令执行多个任务"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#一个脚本命令执行多个任务"}},[s._v("#")]),s._v(" 一个脚本命令执行多个任务")]),s._v(" "),a("ul",[a("li",[a("p",[s._v("并发执行：使用"),a("code",[s._v("&")]),s._v("符号连接需要并发执行的命令，任务将会同时执行，没有执行先后顺序")]),s._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// ts-node file.ts 和 node file.js 同时执行，没有先后顺序")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"test"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"ts-node file.ts & node file.js"')]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])])]),s._v(" "),a("li",[a("p",[s._v("继发执行：使用"),a("code",[s._v("&&")]),s._v("符号连接需要继发执行的命令，命令将按照先后顺序执行。前一个任务完成后，下一个任务才会执行")]),s._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 这个脚本在`tsc file.ts`命令执行完成后，才会继续执行`node file.js`")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"test"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('" tsc file.ts && node file.js"')]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])])])]),s._v(" "),a("h3",{attrs:{id:"钩子-pre和post"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#钩子-pre和post"}},[s._v("#")]),s._v(" 钩子 "),a("code",[s._v("pre")]),s._v("和"),a("code",[s._v("post")])]),s._v(" "),a("p",[s._v("前置任务钩子格式："),a("code",[s._v("prexxx")]),s._v("\n后置置任务钩子格式："),a("code",[s._v("postxxx")]),s._v("\n当执行"),a("code",[s._v("npm run xxx")]),s._v("时，"),a("code",[s._v("npm")]),s._v("会自动检测钩子，并按照"),a("code",[s._v("prexxx")]),s._v("->"),a("code",[s._v("xxx")]),s._v("->"),a("code",[s._v("postxxx")]),s._v("的顺序执行")]),s._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"prebuild"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"rimraf ./dist"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"build"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('" tsc a.ts"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"postbuild"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('" node a.js"')]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br")])]),a("p",[s._v("当执行"),a("code",[s._v("npm run build")]),s._v("时：会优先执行"),a("code",[s._v("prebuild")]),s._v("，然后执行"),a("code",[s._v("build")]),s._v("，最后执行"),a("code",[s._v("postbuild")])]),s._v(" "),a("p",[s._v("等价于："),a("code",[s._v("npm run prebuild && npm run build && npm run postbuild")])]),s._v(" "),a("h3",{attrs:{id:"scripts-snippts"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#scripts-snippts"}},[s._v("#")]),s._v(" scripts snippts")]),s._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 打开浏览器")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"open:dev"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"opener http://localhost:9090"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" \n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 搭建本地http服务器")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"serve"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"http-server -p 9090 dist/"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" \n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 删除目录")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"clean"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"rimraf dist/*"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" \n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 编译ts文件")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"buildTs"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"tsc"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br")])]),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("TIP")]),s._v(" "),a("p",[s._v("以上脚本根据具体逻辑安装相关依赖")])]),s._v(" "),a("h2",{attrs:{id:"bin"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#bin"}},[s._v("#")]),s._v(" "),a("code",[s._v("bin")])]),s._v(" "),a("p",[s._v("配置命令，并映射到可执行文件的路径.")]),s._v(" "),a("p",[s._v("比如你想定义一个命令"),a("code",[s._v("leaf")]),s._v("，运行命令的时候执行"),a("code",[s._v("bin/leaf.js")]),s._v("，则可以这样配置：")]),s._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"bin"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 格式：[命令名称]: [命令路径]")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"leaf"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"bin/leaf.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" \n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])]),a("p",[s._v("如果想使用"),a("code",[s._v("leaf")]),s._v("这个命令，则需要挂载到全局：\n"),a("code",[s._v("npm install . -g")]),s._v("\n或者\n"),a("code",[s._v("npm link")]),s._v("（"),a("code",[s._v("npm unlink 可以解绑命令")]),s._v("）")]),s._v(" "),a("p",[s._v("此时就可以使用"),a("code",[s._v("leaf")]),s._v("命令了")]),s._v(" "),a("p",[a("code",[s._v("vue")]),s._v("命令就是这么实现的")]),s._v(" "),a("p",[s._v("如果想实现自己的脚手架（CLI），就会用到它。我们后续将会详细介绍。")])])}),[],!1,null,null,null);t.default=e.exports}}]);