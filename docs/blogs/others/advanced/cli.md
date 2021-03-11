---
title: "`CLI`从入门到开车"
sidebarDepth: 2
tags: 
    - cli
    - Command-Line
    - 脚手架
---

## 概述

`CLI` 直译就是命令行界面：通过终端命令进行人机交互。
通过一些简单的命令来进行大量琐碎且重复性高的工作（配置环境、集成工具，打包，发布等），
从而让我们有更多的精力专注于业务。

### 开始之前

- 我们将使用`TypeScript`进行业务逻辑的编写
- 内容适用于对`cli`不太了解的小白

## 搭建 `TypeScript` 项目

### 项目初始化

```bash
npm init
```

根据提示设置一下项目

### 安装项目开发依赖

```bash
npm install --save-dev typescript ts-node
```

安装`typescript`本地依赖后，可以使用 `tsc` 转译命令。

### 配置 `tsconfig.json`

```bash
tsc --init
```

按需配置 `tsconfig.json`

<<< @/leaf-cli/tsconfig.json

## 配置可执行命令

1. 创建`leaf.ts`作为命令的可执行入口文件

   ```ts
    #!/usr/bin/env node

    console.log("从0开始CLI");
   ```

   :::tip
   开头的`#!/usr/bin/env node`不能少，这指定了node环境的路径
   :::

2. 在`package.json`中通过`bin`配置命令对应的可执行文件地址

    ```js
    // package.json
    {
        "bin": {
            // `dist` 是`tsconfig.json`编译选项的`outDir`，可根据自己配置修改
            "leaf": "dist/bin/leaf.js"
        }
    }
    ```

3. 执行`tsc`命令，编译`leaf.ts`生成`leaf.js`

   :::tip
   可以通过运行`tsc -w`，监听自动编译`leaf.ts`
   :::

4. 在`CLI`项目根目录下执行`npm link`，把`bin`中配置的命令挂载到全局来进行本地测试

    ```bash
    # <project root dir> 
    npm link
    ```

    :::tip  解除指令

    ```bash
    # <project root dir> 
    npm unlink
    ```

    :::

5. 执行自定义的命令

    ```bash
    leaf
    ```

    :::tip
    控制台将输出：`从0开始CLI"`
    :::

### 目录搭建（参考`nest-cli`）

```js
.
├── bin _(**命令可执行文件目录**)_
├── actions _(**执行命令逻辑目录**)_
├── commands _(**配置命令并解析命令目录**)_
├── bin _(**可执行文件目录**)_
├── lib _(**业务逻辑目录**)_
├── dist _(** 编译后的文件输出目录**)_
│   ├── leaf.ts _(**leaf命令对应的可执行文件**)_
├── node_modules  _(**安装的包**)_
├── package.json
└── tsconfig.json
```

这样我们就实现了一个自定义的全局命令，就是这么简单

接下来，让我们搞点花里胡哨的东西

### 实现 `--version` 和 `--help`

我们使用 [commander](https://www.npmjs.com/package/commander) （命令工具）来编写和处理指令

安装`commander`依赖

```bash
npm install commander --save
```

修改`bin/leaf.ts`

```ts
#!/usr/bin/env node
import * as  program from "commander";

// 读取package.json
import * as pkg from "../package.json";

const bootsctrap = () => {
    // 设置 `--version` 和 `--help` 指令
    program
        // 读取 `package.json`中的`version`
        .version(pkg.version, '-v, --version', 'CLI当前版本.')
        // 执行格式
        .usage('<command> [options]')
        .helpOption('-h, --help', '帮助.');

    // 其他命令一定要在 `program.parse`之前编写，否则无效

    // 解析终端指令
    program.parse(process.argv);

    // 命令
    const [, , cmd] = process.argv;

    // 输出帮助（容错）
    if (cmd === undefined) {
        program.outputHelp();
    }
};
bootsctrap();

```

:::tip
`commander`中的指令 用`<>`包裹的表示必填，使用`[]`包裹的表示选填

```ts
// 执行 create命令 name参数为必选，不设置将会报错
program.command('create <name>')
// 执行 create命令 name参数为可选
program.command('create [name]')   
```

:::

执行 `--version` 和 `--help` （一定要确定 `npm link` 执行过）

```bash
leaf -v
leaf --version
leaf -h
leaf --h
```

这样我们的 `--version` 和 `--help`指令就完成了

### 实现 `--info`

让我们实现一个`--info`指令，用来展示更详细的`cli`信息

基础建设：

1. 新建一个`commands/command.ts`用来描述每一个command的类型

    ```ts
    import commander = require("commander");
    export type Command = (program: commander.CommanderStatic) => void;
    ```

2. 新建`actions/action.ts`用来描述每一个action类型

    ```ts
    export type Input = {
        name: string;
        value: boolean | string;
    };
    export type Action = (inputs?: Input[], options?: Input[]) => Promise<void>;
    ```

让我们按照这个流程来实现自己的`--info`

安装[chalk](https://www.npmjs.com/package/chalk) （控制台输出内容样式）依赖

```bash
npm install chalk --save
```

创建`commands/info.ts`来编辑指令

```ts
import { Action } from "../actions/action";
import { Command } from "./command";

// 创建 Info Command
export const of = (action: Action): Command => program => {
    program
        // 编辑指令 leaf info
        .command("info")
        // 设置指令简写 leaf i
        .alias("i")
        // 指令描述，执行：leaf info --help 展示此信息
        .description("显示CLI详情.")
        .action(async () => {
            // 执行具体业务逻辑（因为info指令不需要参数，因此不做参数处理）
            await action();
        });
};
```

创建`actions/info.ts`来处理指令逻辑

```ts
import { green, blue, red } from "chalk";
import * as os from "os";
import { Action } from "./action";

// package.json
import * as pkg from "../package.json";

// 展示系统信息
const displaySysInfo = () => {
    console.info(green('[系统信息]'));
    console.info(`系统版本：${blue(os.platform(), os.release())}`);
    console.info('NodeJS 版本 :', blue(process.version));
};

// 展示 cli 信息
const displayPackageInfo = () => {
    console.info(green('[LEAF CLI]'));
    console.info('LEAF CLI Version: ', blue(pkg.version));
    console.info(green('[依赖模块]'));
    const dependencies = pkg.dependencies;
    for (const dependency in dependencies) {
        const key = dependency as keyof typeof dependencies;
        console.info(key, blue(dependencies[key]));
    }
};

// Info Action
export const action: Action = async () => {
    displayBanner();
    displaySysInfo();
    displayPackageInfo();
};
```

挂载指令：
修改`bin/leaf.ts`

```ts
#!/usr/bin/env node
import * as  program from "commander";
import { action as infoAction } from "../actions/info";
import { of as infoCmdOf } from "../commands/info";

// 读取package.json
import * as pkg from "../package.json";

const bootsctrap = () => {
    // 设置 `--version` 和 `--help` 指令
    program
        // 读取 `package.json`中的`version`
        .version(pkg.version, '-v, --version', 'CLI当前版本.')
        // 执行格式
        .usage('<command> [options]')
        .helpOption('-h, --help', '帮助.');

    // 其他命令一定要在 `program.parse`之前编写，否则无效
    // 加载info指令
    infoCmdOf(infoAction)(program);

    // 解析终端指令
    program.parse(process.argv);

    // 命令
    const [, , cmd] = process.argv;

    // 输出帮助（容错）
    if (cmd === undefined) {
        program.outputHelp();
    }
};
bootsctrap();

```

执行`--info`命令

```bash
leaf i
leaf info
```

输出结果（实际会有颜色变化，此处忽略）：

```bash
[系统信息]
系统版本：win32 10.0.14393
NodeJS 版本 : v12.13.1
[LEAF CLI]
LEAF CLI Version:  0.0.1
[依赖模块]
chalk ^4.1.0
commander ^7.1.0
```

这样我们就实现了`--info`命令

### 实现指令的智能推断

目的：手动输入了错误的指令时，提高用户体验，给出智能推断的指令

安装`leven`依赖，用来测量字符串差异

```bash
npm install leven --save
```

新建`commands/suggest.ts`

```ts
import { Action, Input } from "../actions/action";
import { Command } from "./command";

// 创建 Suggest Command
export const of = (action: Action): Command => program => {
    program
        .arguments('[command]')
        .action(async inputCmd => {

            if (!inputCmd) {
                return;
            }

            const inputs: Input[] = [];

            inputs.push({
                name: 'name',
                value: inputCmd
            });

            const options: Input[] = program.commands.map(cmd => ({
                name: cmd.name(),
                value: cmd.name()
            }));

            await action(inputs, options);
        })
};
```

新建`actions/suggest.ts`

```ts
import { red, yellow } from "chalk";
import leven = require("leven");
import { Action, Input } from "./action";


// Suggest Action
export const action: Action = async (inputs?: Input[], options?: Input[]) => {
    const inputCmd = inputs?.find(value => value.name === 'name')?.value as string;

    const suggestion = options?.reduce(
        (betterMatchable, availableCmd) => {
            const isBetterMatch = leven(availableCmd.value as string, inputCmd) < leven(betterMatchable, inputCmd);
            if (isBetterMatch && leven(availableCmd.value as string, inputCmd) < 3) {
                return availableCmd.value as string;
            }
            return betterMatchable
        }
        , ''
    );

    if (suggestion) {
        console.info(`${red('你是否想输入:')} ${yellow(suggestion)}?`);
    }
};
```

挂载`suggest`命令

编辑`bin/leaf.ts`

```ts
#!/usr/bin/env node
import * as  program from "commander";

import { action as infoAction } from "../actions/info";
import { of as infoCmdOf } from "../commands/info";

import { action as suggestAction } from "../actions/suggest";
import { of as suggestCmdOf } from "../commands/suggest";

// 读取package.json
import * as pkg from "../package.json";

const bootsctrap = () => {
    // 设置 `--version` 和 `--help` 指令
    program
        // 读取 `package.json`中的`version`
        .version(pkg.version, '-v, --version', 'CLI当前版本.')
        // 执行格式
        .usage('<command> [options]')
        .helpOption('-h, --help', '帮助.');

    // 其他命令一定要在 `program.parse`之前编写，否则无效
    // 加载suggest指令
    suggestCmdOf(suggestAction)(program);
    // 加载info指令
    infoCmdOf(infoAction)(program);

    // 解析终端指令
    program.parse(process.argv);

    // 命令
    const [, , cmd] = process.argv;

    // 输出帮助（容错）
    if (cmd === undefined) {
        program.outputHelp();
    }
};
bootsctrap();
```

执行命令:

```bash
# 错误的指令
leaf inf
```

输出：

```bash
你是否想输入: info?
```

### 常用依赖库

- [commander](https://www.npmjs.com/package/commander) （命令工具）
- [download](https://www.npmjs.com/package/download) （文件下载）
- [fs-extra](https://www.npmjs.com/package/fs-extra) （本地文件操作）
- [inquirer](https://www.npmjs.com/package/inquirer) （命令行交互）
- [update-notifier](https://www.npmjs.com/package/update-notifier) （pm在线检查更新）
- [chalk](https://www.npmjs.com/package/chalk) （控制台输出内容样式）
- [log-symbols](https://www.npmjs.com/package/log-symbols) （日志美化）
- [ora](https://www.npmjs.com/package/ora) （Spinner等待动画）
