import { Action, Input } from "../actions/action";
import { Command } from "./command";
import * as commander from "commander";
import * as path from "path";

// option map
const optionMap = {
    directory: "-d, --directory <directory>"
};

// option type
type OptionType = commander.Command & Record<keyof typeof optionMap, string>;

// 创建 init Command
export const of = (action: Action): Command => program => {
    program
        .command('create [name]')
        .alias('c')
        .description('创建项目. name为可选，不填默认为当前目录名称')
        .option(optionMap.directory, '指定工程目录')
        .action(
            async (name: string | undefined, command: OptionType) => {
                // options
                const options: Input[] = (Object.keys(optionMap) as (keyof typeof optionMap)[])
                    // 过滤值为空的option选项
                    .filter(key => command[key] !== undefined)
                    // 转换为 Input[]
                    .map(key => ({
                        name: key,
                        value: command[key]
                    }));

                // inputs
                const inputs: Input[] = name
                    ?
                    [{
                        name: "name",
                        value: name
                    }]
                    :
                    [];

                await action(inputs, options);
            }
        );
};