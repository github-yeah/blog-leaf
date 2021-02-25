import { red, yellow } from "chalk";
import leven = require("leven");
import { Action, Input } from "./action";


// Suggest Action
export const action: Action = async (inputs?: Input[], options?: Input[]) => {
    const inputCmd = inputs?.find(value => value.name === 'name')?.value as string;

    const suggestion = options?.reduce(
        (betterMatchable, availableCmd) => {
            const isBetterMatch = leven(availableCmd.value as string, inputCmd) < leven(betterMatchable, inputCmd);
            if (isBetterMatch && leven(availableCmd.value as string, inputCmd) < 3) {
                return availableCmd.value as string;
            }
            return betterMatchable
        }
        , ''
    );

    if (suggestion) {
        console.info(`${red('你是否想输入:')} ${yellow(suggestion)}?`);
    }
};