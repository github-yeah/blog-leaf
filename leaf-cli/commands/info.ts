import { Action } from "../actions/action";
import { Command } from "./command";

// 创建 Info Command
export const of = (action: Action): Command => program => {
    program
        .command("info")
        .alias("i")
        .description("CLI详情.")
        .action(async () => {
            await action();
        });
};