import { Action, Input } from "../actions/action";
import { Command } from "./command";
import * as commander from "commander";

const optionMap = {
    force: "-f, --force"
};

// option type
type OptionType = commander.Command & Record<keyof typeof optionMap, string>;

// 创建 init Command
export const of = (action: Action): Command => program => {
    program
        .command('create [project]')
        .option(optionMap.force, '如果项目存在强行覆盖')
        .alias('c')
        .description('创建项目 [project] --force')
        .action(
            async (project: string | undefined, opt: OptionType) => {
                // inputs
                const options: Input[] = (Object.keys(optionMap) as (keyof typeof optionMap)[])
                    // 过滤值为空的option选项
                    .filter(key => opt[key] !== undefined)
                    // 转换为 Input[]
                    .map(key => ({
                        name: key,
                        value: opt[key]
                    }));

                // inputs
                const inputs: Input[] = project
                    ?
                    [{
                        name: "project",
                        value: project
                    }]
                    :
                    [];

                await action(inputs, options);
            }
        );
};