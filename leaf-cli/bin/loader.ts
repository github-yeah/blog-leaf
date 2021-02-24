import { CommanderStatic } from "commander";
import { red } from "chalk";

import { action as infoAction } from "../actions/info";
import { of as infoCmdOf } from "../commands/info";

import { action as createAction } from "../actions/create";
import { of as createCmdOf } from "../commands/create";


// 处理无效命令
const invalidCommandHandler = (program: CommanderStatic) => program.on("command:*", () => {
    console.error(`[ERROR]\n无效命令：${red(program.args.join(" "))}`);
    console.log(`[Log] 使用${red('--help')}查看命令列表`);
})


// 加载
export const load = (program: CommanderStatic) => {
    infoCmdOf(infoAction)(program);
    createCmdOf(createAction)(program);
    invalidCommandHandler(program);
};

