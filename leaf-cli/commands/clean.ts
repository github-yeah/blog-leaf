import { Action, Input } from "../actions/action";
import { Command } from "./command";

// 创建 clean Command
export const of = (action: Action): Command => program => {
    program
        .command('clean [directory]')
        .description('清理项目，[directory]默认为dist')
        .action(
            async (directory: string | undefined) => {

                // inputs
                const inputs: Input[] = directory
                    ?
                    [{
                        name: "directory",
                        value: directory
                    }]
                    :
                    [];

                await action(inputs);
            }
        );
};