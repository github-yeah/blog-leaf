import { Action, Input } from "../actions/action";
import { Command } from "./command";
import * as commander from "commander";
import { CompilerOptions } from 'typescript';
import { option } from "commander";



const optionList = [
    '--outDir [dirname]',
    '--target [ScriptTarget]',
    '--project [directory]',
    '--declaration',
];


// 创建 init Command
export const of = (action: Action): Command => program => {
    optionList
        .reduce(
            (cmd, opt) => {
                cmd.option(opt);
                return cmd
            }
            ,
            program.command('build [files...]')
        )
        .alias('b')
        .description('构建项目 [files]')
        .action(
            async (files: string[] | undefined, opt: Object) => {
                // inputs
                const options: Input[] | undefined = Object.entries(opt).map(o => ({
                    name: o[0],
                    value: o[1] as string | boolean
                }));

                // inputs
                const inputs: Input[] | undefined = files?.map(file => ({
                    name: 'files',
                    value: file
                }));

                await action(inputs, options);
            }
        );

};