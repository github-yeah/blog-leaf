import { CommanderStatic } from "commander";

import { action as infoAction } from "../actions/info";
import { of as infoCmdOf } from "../commands/info";



// 加载
export const load = (program: CommanderStatic) => {
    infoCmdOf(infoAction)(program);
};