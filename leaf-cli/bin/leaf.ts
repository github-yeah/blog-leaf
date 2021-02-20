#!/usr/bin/env node

// commander
import * as  program from "commander";
import { red } from "chalk";

// package.json
import * as pkg from "../package.json";

// tsconfig.json
import * as tscfg from "../tsconfig.json";

// commands loader
import * as commandLoader from "./loader";

import { BANNER } from './../lib/ui/banner';

// 终端输出 banner
// console.info(red(BANNER));

const bootsctrap = () => {

    // 基础信息
    program
        .version(pkg.version, '-v, --version', '当前node版本.')
        .usage('<command> [options]')
        .helpOption('-h, --help', '帮助.');


    // 命令加载器，必须在program.parse之前加载，否则无法生效
    commandLoader.load(program);

    // 解析终端指令
    program.parse(process.argv);

    // 命令
    const [, , cmd] = process.argv;

    // 输出帮助
    if (cmd === undefined) {
        program.outputHelp();
    }
};
bootsctrap();