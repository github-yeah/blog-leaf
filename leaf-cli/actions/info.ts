import { green, blue, red } from "chalk";
import * as os from "os";

import { BANNER } from './../lib/ui/banner';
import { Action } from "./action";

// package.json
import * as pkg from "../package.json";


// 控制台输出banner
const displayBanner = () => {
    console.info(red(BANNER));
};

// 系统信息
const displaySysInfo = () => {
    console.info(green('[系统信息]'));
    console.info(`系统版本：${blue(os.platform(), os.release())}`);
    console.info('NodeJS 版本 :', blue(process.version));
};

// leaf-cli 信息
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