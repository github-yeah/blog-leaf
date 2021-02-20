import { BANNER } from './../lib/ui/banner';
import { Action } from "./action";

import { green, blue, red } from "chalk";

// banner
const displayBanner = () => {
    console.info(red(BANNER));
}

// 系统信息
const displaySysInfo = () => {
    console.info(green('[系统信息]'));
    console.info('Node Version :', blue(process.version));
}

// Info Action
export const action: Action = async () => {
    displayBanner();
    displaySysInfo();
};