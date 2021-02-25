import { CommanderStatic } from "commander";
import { red } from "chalk";

// info 
import { action as infoAction } from "../actions/info";
import { of as infoCmdOf } from "../commands/info";

// create 
import { action as createAction } from "../actions/create";
import { of as createCmdOf } from "../commands/create";

// suggust 输入无效命令后尝试猜测用户意图
import { action as suggestAction } from "../actions/suggest";
import { of as suggestCmdOf } from "../commands/suggest";


// 处理无效命令
const invalidCommandHandler = (program: CommanderStatic) => program.on("command:*", () => {
    console.error(`[ERROR]\n无效命令：${red(program.args.join(" "))}`);
    console.log(`[Log] 使用${red('--help')}查看命令列表`);
})


// 加载
export const load = (program: CommanderStatic) => {
    suggestCmdOf(suggestAction)(program);
    infoCmdOf(infoAction)(program);
    createCmdOf(createAction)(program);
    invalidCommandHandler(program);
};

