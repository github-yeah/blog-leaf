import { Action, Input } from "../actions/action";
import { Command } from "./command";

// 创建 Suggest Command
export const of = (action: Action): Command => program => {
    program
        .arguments('[command]')
        .action(async inputCmd => {

            if (!inputCmd) {
                return;
            }

            const inputs: Input[] = [];

            inputs.push({
                name: 'name',
                value: inputCmd
            });

            const options: Input[] = program.commands.map(cmd => ({
                name: cmd.name(),
                value: cmd.name()
            }));

            await action(inputs, options);
        })
};